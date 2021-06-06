import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AOfficialComponent} from "~/classes/components/a-official-component";
import {OfficialAsyncAdataUtil} from "~/classes/utils/official-async-adata-util";
import {officialModule} from "~/store/official";
import {appModule} from "~/store/app";
import {bodyModule} from '~/store/body';
import {debugModule} from "~/store/debug";
import {previewModule} from "~/store/preview";
import {$v} from "~/classes/utils/var-util";
import {Project} from '~/configs/project';
import {pageShowProjectModule} from "~/store/page/show-project";
import {To025} from "~/classes/domain/to025";
import {appProjectModule} from "~/store/app/project";

const TAG = '/';
const state = {
    config: {
        lang: 'pages.index',
    },
    param: {
        user: '',
        pj: '',
        page: 0,
    },
    ssr: {
        project: {} as any,
    },
    view: {
        ready: false,
    },
};

@Component({
    components: {}
})
export default class P extends AOfficialComponent {

    public state = state;

    public project_data: any = Project;
    public global: any = Project.global;
    public fullscreen_txt: string = 'fullscreen';

    public info_hover: boolean = false;

    public cvTxt: any = {};
    public cvBg: any = {};
    public isWeb: boolean = false;
    public isShadow: boolean = true;
    public isUi: boolean = true;
    public isScroll: boolean = false;

    @Watch('active')
    public watchActive(value: any) {
        this.moveActive();
    }

    @Watch('isFullscreen')
    public watchIsFullscreen(value: any) {

        if (value) {
            this.fullscreen_txt = 'fullscreen'; //cancel

        } else {
            this.fullscreen_txt = 'fullscreen';
        }
    }


    // Computed /////////////////////////////////////////////////////////
    public get isReady(): boolean {
        return this.state.view.ready;
    }

    public get active(): any {
        return previewModule.active;
    }

    public get img_path(): any {
        return this.img(this.project_data.items[previewModule.active].img);
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
    public moveActive() {
        // fade out ///////////////////////
        this.state.view.ready = false;

        // action ///////////////////////

        setTimeout(() => {

            this.updateItem();

            setTimeout(() => {
                this.state.view.ready = true;

            }, 700);

        }, 640);

        //fade in ///////////////////////
    }

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
        // this.$router.push('./' + previewModule.active);
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
    public img(path: string): string {
        return To025.File.AccessUtil.path(path);
    }

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

    public get items(): any[] {
        return $v.p(this.project_data, 'items', []);
    }

    public get index(): number {
        return previewModule.active;
    }

    public get isFirst(): boolean {
        return this.index === 0;
    }

    public get isLast(): boolean {
        return this.index >= (this.items.length - 1);
    }

    // Base //////////////////////////////////////////////////
    public async asyncData(ctx: any) {

        const user = $v.p(ctx, 'route.params.user');
        const pj = $v.p(ctx, 'route.params.pj');
        const page = Number($v.p(ctx, 'route.params.p', 0));

        const res = await pageShowProjectModule.$get({
            user,
            pj,
        });

        console.log('project >', {user, pj, res});

        return OfficialAsyncAdataUtil.load(ctx, {
            ...state,
            ...{
                param: {
                    user,
                    pj,
                    page,
                },
                ssr: {
                    project: $v.p(res, 'ex.project'),
                },
            },
        });
    }

    public async created() {
        await this.initPj();
        appProjectModule.updateMode('show');

        this.updateItem();
    }

    public async initPj() {
        console.log('%s.initPj', TAG, this.state.ssr.project);

        if (!this.state.ssr.project) {
            return;
        }

        this.project_data = $v.p(this.state, 'ssr.project');
        this.global = $v.p(this.state, 'ssr.project.global');
    }

    public head() {
        // console.log('head > ', this.state.ssr, $v.p(this.state.ssr, 'project.global.title'));
        return {
            title: $v.p(this.state.ssr, 'project.global.title'),
        };
    }

    public async mounted() {
        await this.initParam();
        officialModule.updateIsNavScrollSwitch(true);
        officialModule.updateUseNavScrollSwitch(true);
        this.moveActive();

    }

    public async initParam() {
        debugModule.updateCode($v.p(this.$route, 'query.debug'));
        previewModule.updateActive(this.state.param.page);
    }
}
