import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AOfficialComponent} from "~/classes/components/a-official-component";
import {OfficialAsyncAdataUtil} from "~/classes/utils/official-async-adata-util";
import {officialModule} from "~/store/official";
import {appModule} from "~/store/app";
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
export default class P extends AOfficialComponent {


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

    @Watch('active')
    public watchActive(value: any) {

        if (value + 1 >= this.project_data.items.length) {
            this.isLast = true;

        } else {
            this.isLast = false;
        }

        if (value <= 0) {
            this.isFirst = true;

        } else {
            this.isFirst = false;
        }

        // fade out ///////////////////////
        this.state = false;

        // action ///////////////////////

        setTimeout(() => {

            this.updateItem();

            setTimeout(() => {
                this.state = true;

            }, 700);

        }, 640);

        //fade in ///////////////////////

    }

    @Watch('isFullscreen')
    public watchIsFullscreen(value: any) {

        if (value) {
            this.fullscreen_txt = 'fullscreen'; //cancel

        } else {
            this.fullscreen_txt = 'fullscreen';
        }
    }


    public created() {
        this.updateItem();
    }


    // Computed /////////////////////////////////////////////////////////

    public get active(): any {
        return previewModule.active;
    }

    public get img_path(): any {
        return this.project_data.items[previewModule.active].img;
    }

    public get isFullscreen(): any {
        return previewModule.fullscreen;
    }


    // Event /////////////////////////////////////////////////////////

    public onInfoMouseEnter() {
        this.info_hover = true;
    }

    public onInfoMouseLeave() {
        this.info_hover = false;
    }


    // Methods /////////////////////////////////////////////////////////

    public updateItem() {

        if (this.project_data.items[previewModule.active].txt) {
            this.cvTxt = {
                '--txt': this.project_data.items[previewModule.active].txt,
            }

        } else {
            this.cvTxt = {
                '--txt': this.project_data.global.txt,
            }
        }

        if (this.project_data.items[previewModule.active].bg) {
            this.cvBg = {
                '--bg': this.project_data.items[previewModule.active].bg,
            }

        } else {
            this.cvBg = {
                '--bg': this.project_data.global.bg,
            }
        }

        if (this.project_data.items[previewModule.active].shadow) {
            this.isShadow = true;

        } else {
            this.isShadow = false;
        }


        if (this.project_data.items[previewModule.active].web) {
            this.isWeb = true;
            this.isUi = false;
            this.isShadow = true;

        } else {
            this.isWeb = false;
            this.isUi = true;
        }


        if (this.project_data.items[previewModule.active].scroll) {
            this.isScroll = true;

        } else {
            this.isScroll = false;
        }
    }

    public onPager(value: any) {

        if (value == 'next') {

            if (!this.isLast) {
                previewModule.updateActive(previewModule.active + 1);
            }

        } else if (value == 'prev') {

            if (!this.isFirst) {
                previewModule.updateActive(previewModule.active - 1);
            }

        } else {
            previewModule.updateActive(value);
        }
//         console.log(`Active: ${previewModule.active} isFirst: ${this.isFirst} isLast: ${this.isLast}`);

    }

    public onFullscreen() {

        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            previewModule.updateFullscreen(true);

        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                previewModule.updateFullscreen(false);
            }
        }
    }


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
