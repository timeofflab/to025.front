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

const TAG = '/';
const state = {
    config: {
        lang: 'pages.index',
    },
};

@Component({
    components: {}
})
export default class index extends AOfficialComponent {


    public project_data: any = Project;
    public global: any = Project.global;
    public fullscreen_txt: string = 'fullscreen';

    public state: boolean = true;
    public isFirst: boolean = true;
    public isLast: boolean = false;
    public info_hover: boolean = false;

    public cvTxt: any = {};
    public cvBg: any = {};
    public isWeb: boolean = false;
    public isShadow: boolean = true;
    public isUi: boolean = true;
    public isScroll: boolean = false;

    // Computed /////////////////////////////////////////////////////////
    // Event /////////////////////////////////////////////////////////

    // Methods /////////////////////////////////////////////////////////
    // Methods ////////////////////////////////////////////////


    // Computed ////////////////////////////////////////////////

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
        officialModule.updateIsNavScrollSwitch(true);
        officialModule.updateUseNavScrollSwitch(true);
    }

    public async initParam() {
        debugModule.updateCode($v.p(this.$route, 'query.debug'));
    }
}
