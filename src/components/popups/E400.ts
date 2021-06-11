import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";
import {ExtEdit} from "~/classes/components/ext/ext-edit";
import {pageShowProjectModule} from "~/store/page/show-project";
import {$v} from "~/classes/utils/var-util";
import {CryptUtil} from "~/classes/utils/crypt-util";
import {appProjectModule} from "~/store/app/project";
import {appProjectShowModule} from "~/store/app/project-show";

const TAG = 'C/popups/Auth';

@Component
export default class E400 extends AToComponent {

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
                return '';
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


