import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AOfficialComponent} from "~/classes/components/a-official-component";
import {OfficialAsyncAdataUtil} from "~/classes/utils/official-async-adata-util";
import {officialModule} from "~/store/official";
import {appModule} from "~/store/app";
import WindowUtil from "~/classes/utils/window-util";
import {IPopup, PopupModule, popupModule, PopupState} from "~/store/popup";
import {bodyModule} from '@/store/body';
import {debugModule} from "~/store/debug";
import {previewModule} from "~/store/preview";
import {$v} from "~/classes/utils/var-util";
import {Project} from '@/configs/project';
import {ExtEdit} from "~/classes/components/ext/ext-edit";
import {appAuthModule} from "~/store/app/auth";

const TAG = '/';
const state = {
    config: {
        lang: 'pages.index',
        editId: 'index',
    },
    view: {
        ready: false,
        submit: false,
    },
};

@Component({
    components: {}
})
export default class index extends AOfficialComponent {

    public project_data: any = Project;
    public global: any = Project.global;
    public fullscreen_txt: string = 'fullscreen';

    public isFirst: boolean = true;
    public isLast: boolean = false;
    public info_hover: boolean = false;

    public cvTxt: any = {};
    public cvBg: any = {};
    public isWeb: boolean = false;
    public isShadow: boolean = true;
    public isUi: boolean = true;
    public isScroll: boolean = false;

    public state = {} as any;

    // Computed /////////////////////////////////////////////////////////
    // Event /////////////////////////////////////////////////////////

    // Methods /////////////////////////////////////////////////////////
    public async submit() {

        console.log('%s.submit｜input', TAG, this.input);

        const email = $v.p(this.input, 'email');

        if ($v.isEmpty(email)) {
            console.log('%s｜mail is empty', TAG, email);
            return;
        }

        const success = await appAuthModule.postAuth({
            email,
        });

        if (success) {
            this.state.view.submit = true;
        } else {
            await this.extEdit.updateErrors([
                {name: 'email', messages: ['Invalid email']},
            ]);
            console.log('%s.submit｜submit - error', TAG, this.extEdit.errors);
        }
    }

    public async onInput(e: any) {
        await this.extEdit.clearErrors();
        await this.extEdit.onInput(e);
    }

    // Events ////////////////////////////////////////////////
    public async onClickSubmit() {
        await this.submit();
    }

    public async onSubmit(): Promise<boolean> {
        await this.submit();
        return false;
    }

    // Computed ////////////////////////////////////////////////
    public get extEdit(): ExtEdit {
        return new ExtEdit(this);
    }

    public get input(): any {
        return this.extEdit.input;
    }

    public get deviceSize(): any {
        return appModule.deviceSize;
    }

    public get scrollTop(): any {
        return bodyModule.scrollTop;
    }

    public get windowHeight(): any {
        return appModule.window.size.height;
    }

    // Base //////////////////////////////////////////////////
    public async asyncData(ctx: any) {
        return OfficialAsyncAdataUtil.load(ctx, state);
    }

    public head() {
    }

    public async mounted() {
        await this.initParam();
        await this.initInput();
        officialModule.updateIsNavScrollSwitch(true);
        officialModule.updateUseNavScrollSwitch(true);
    }

    public async initParam() {
        debugModule.updateCode($v.p(this.$route, 'query.debug'));
    }

    public async initInput() {
        await this.extEdit.updateInput({
            email: '',
        });
    }
}
