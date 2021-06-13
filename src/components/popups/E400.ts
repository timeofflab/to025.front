import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {ExtEdit} from "~/classes/components/ext/ext-edit";
import {appProjectShowModule, ProjectShowErrorType} from "~/store/app/project-show";
import {APopupComponent} from "~/classes/components/a-popup-component";

const TAG = 'C/popups/Auth';

@Component
export default class E400 extends APopupComponent {

    @Prop()
    public cid: string;

    public state = {
        config: {
            editId: 'popupAuth',
        },
    };

    // Events //////////////////////////////////////
    public async onClickClose() {

    }

    // Computed ////////////////////////////////////
    public get extEdit(): ExtEdit {
        return new ExtEdit(this);
    }

    public get input(): any {
        return this.extEdit.input;
    }

    public get errors(): any {
        return this.extEdit.errors;
    }

    public get error(): ProjectShowErrorType {
        return appProjectShowModule.error;
    }

    public get isShow(): boolean {
        return !!appProjectShowModule.error;
    }

    public get msg(): string {
        switch (appProjectShowModule.error) {
            case 'expired':
                return 'Expired';
            case 'notFound':
                return 'Presentation not found';
            default:
                return 'Exception';
        }
    }

    // Evetns //////////////////////////////////////
    public async mounted() {
        await this.initInput();
    }

    public async initInput() {
        await this.extEdit.updateInput({
            password: '',
        });
    }
}


