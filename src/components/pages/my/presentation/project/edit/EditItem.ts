import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AOfficialComponent} from "~/classes/components/a-official-component";
import {ExtEdit} from "~/classes/components/ext/ext-edit";
import {pageMyPresentationProjectModule} from "~/store/page/my-presentation-project";
import {appProjectModule} from "~/store/app/project";
import {IEditSchema} from "~/store/edit";
import {cmdModule} from "~/store/cmd";
import {AppCmd} from "~/configs/app-cmd";

const TAG = 'EditItem';

@Component
export default class EditItem extends AOfficialComponent {
    public state = {
        config: {
            editId: 'presentationProjectEditItem',
            form: {
                schemas: [
                    {
                        name: 'label',
                        title: 'Label',
                        maxlength: 20,
                    },
                    {
                        name: 'img',
                        type: 'file',
                        title: 'Img',
                        maxlength: 1000,
                    },
                    {
                        name: 'bg',
                        title: 'Bg',
                        maxlength: 20,
                    },
                    {
                        name: 'shadow',
                        title: 'Shadow',
                        maxlength: 50,
                    },
                    {
                        name: 'web',
                        title: 'Web',
                        maxlength: 100,
                    },
                    {
                        name: 'Scroll',
                        title: 'scroll',
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

    // Methods /////////////////////////////////////
    public async addItem() {

    }

    // Events //////////////////////////////////////
    public async onInput(e: any) {
        await this.extEdit.onInput(e);

        switch (e.target.name) {
            case 'file':
                console.log('onInput.File');
                break;
            default:
                break;
        }
    }

    public async onClickSave() {
        await cmdModule.registCmd({
            cmd: AppCmd.PresentationProjectSave,
        });
    }

    // Computed /////////////////////////////////////
    public get extEdit(): ExtEdit {
        return new ExtEdit(this);
    }

    public get input(): any {
        return this.extEdit.input;
    }

    public get currentProject(): string {
        return pageMyPresentationProjectModule.project;
    }

    public get currentRecord(): any {
        return appProjectModule.records.findByKey('id', this.currentProject);
    }

    public get pageItem(): any {
        return pageMyPresentationProjectModule.pageItem;
    }

    public get page(): number {
        return Number(pageMyPresentationProjectModule.page);
    }

    public get pageL(): number {
        return this.page + 1;
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
                label: '',
                img: '',
                bg: '',
                shadow: '',
                web: '',
                scroll: '',
            },
            ...this.pageItem || {},
        });
    }
}
