import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AOfficialComponent} from "~/classes/components/a-official-component";
import {ExtEdit} from "~/classes/components/ext/ext-edit";
import {
    pageMyPresentationProjectModule as PMPPM,
} from "~/store/page/my-presentation-project";
import {appProjectModule} from "~/store/app/project";
import {IEditSchema} from "~/store/edit";
import {uploadModule} from "~/store/upload";
import {$v} from "~/classes/utils/var-util";

const TAG = 'EditItem';

@Component
export default class EditItem extends AOfficialComponent {
    public state = {
        config: {
            editId: 'presentationProjectEditItem',
            upload: {
                img: 'presentationEditItemImg',
            },
            form: {
                schemas: [
                    {
                        name: 'label',
                        title: 'Label',
                        maxlength: 20,
                    },
                    {
                        name: 'img.x2',
                        type: 'file',
                        title: 'Img(x2)',
                        maxlength: 1000,
                    },
                    {
                        name: 'img.x1',
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
                        type: 'radio',
                        values: [
                            {value: 0, label: 'OFF'},
                            {value: 1, label: 'ON'},
                        ],
                        maxlength: 50,
                    },
                    {
                        name: 'web',
                        title: 'Web',
                        type: 'radio',
                        values: [
                            {value: 0, label: 'OFF'},
                            {value: 1, label: 'ON'},
                        ],
                    },
                    {
                        name: 'scroll',
                        title: 'Scroll',
                        type: 'radio',
                        values: [
                            {value: 0, label: 'OFF'},
                            {value: 1, label: 'ON'},
                        ],
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
    // Events //////////////////////////////////////

    // Computed /////////////////////////////////////
    public get extEdit(): ExtEdit {
        return new ExtEdit(this);
    }

    public get input(): any {
        return this.extEdit.input;
    }

    public get currentProject(): string {
        return PMPPM.project;
    }

    public get currentRecord(): any {
        return appProjectModule.records.findByKey('id', this.currentProject);
    }

    public get pageItem(): any {
        return PMPPM.pageItem;
    }

    public get pageL(): number {
        return PMPPM.page;
    }

    public get record(): any {
        return PMPPM.record;
    }

    public get pjItems(): any {
        return $v.p(this.record, 'ex.item.items', []);
    }

    public get uploads(): any[] {
        return uploadModule.uploads;
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
                img: {
                    x2: '',
                    x1: '',
                },
                bg: '',
                shadow: '',
                web: '',
                scroll: '',
            },
            ...this.pageItem || {},
        });

        // Clear uploads
        Object.keys(this.state.config.upload).map((_: string) => {
            uploadModule.removeUpload($v.p(this.state.config.upload, _));
        });
    }
}
