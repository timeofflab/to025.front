import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AOfficialComponent} from "~/classes/components/a-official-component";
import {ExtEdit} from "~/classes/components/ext/ext-edit";
import {appProjectModule} from "~/store/app/project";
import {pageMyPresentationProjectModule} from "~/store/page/my-presentation-project";
import {IEditSchema} from "~/store/edit";
import {$v} from "~/classes/utils/var-util";

const TAG = 'EditGlobal';

@Component
export default class EditGlobal extends AOfficialComponent {

    public state = {
        config: {
            editId: 'presentationProjectEditGlobal',
            form: {
                schemas: [
                    {
                        name: 'date',
                        title: 'Date',
                        maxlength: 20,
                    },
                    {
                        name: 'proposer',
                        title: 'Proposer',
                        maxlength: 20,
                    },
                    {
                        name: 'title',
                        title: 'Title',
                        maxlength: 20,
                    },
                    {
                        name: 'transition',
                        title: 'Transition',
                        maxlength: 20,
                    },
                    {
                        name: 'txt',
                        title: 'Text',
                        maxlength: 20,
                    },
                    {
                        name: 'bg',
                        title: 'Bg',
                        maxlength: 20,
                    },
                    {
                        name: 'limit',
                        title: 'Limit',
                        maxlength: 20,
                    },
                    {
                        name: 'password',
                        title: 'Password',
                        maxlength: 20,
                    },
                ],
            },
        },
        view: {
            ready: false,
        },
    }

    @Watch('record.id')
    public async watchRecordId() {
        console.log('%s.watchRecordId｜', TAG);
        await this.initInput();
    }

    // Events //////////////////////////////////////
    public async onInput(e: any) {
        await this.extEdit.onInput(e);
    }

    // Computed /////////////////////////////////////
    public get extEdit(): ExtEdit {
        return new ExtEdit(this);
    }

    public get input(): any {
        return this.extEdit.input;
    }

    public get currentProject(): string {
        return pageMyPresentationProjectModule.currentProject;
    }

    public get currentRecord(): any {
        return appProjectModule.records.findByKey('id', this.currentProject);
    }
    public get currentItem(): any {
        return $v.p(this.currentRecord, 'ex.item.global');
    }
    // Init /////////////////////////////////////////////
    public async mounted() {
        await this.initEdit();
        await this.initInput();
    }

    public async initEdit() {
        await this.extEdit.updateEdit({
            id: this.extEdit.cid,
            schemas: this.state.config.form.schemas as IEditSchema[],
        });
    }

    public async initInput() {
        await this.extEdit.updateInput({
            ...{
                date: '',
                proposer: '',
                title: '',
                transition: '',
                txt: '',
                bg: '',
                limit: '',
                password: '',
            },
            ...this.currentItem || {},
        });
    }
}
