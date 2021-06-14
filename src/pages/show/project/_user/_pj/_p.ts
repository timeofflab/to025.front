import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AOfficialComponent} from "~/classes/components/a-official-component";
import {OfficialAsyncAdataUtil} from "~/classes/utils/official-async-adata-util";
import {officialModule} from "~/store/official";
import {appModule} from "~/store/app";
import {bodyModule} from '~/store/body';
import {debugModule} from "~/store/debug";
import {previewModule} from "~/store/preview";
import {$v} from "~/classes/utils/var-util";
// import {Project} from '~/configs/project';
import {Project} from '~/configs/to025/container/project';
import {pageShowProjectModule} from "~/store/page/show-project";
import {To025} from "~/classes/domain/to025";
import {appProjectModule} from "~/store/app/project";
import {appProjectShowModule, ProjectShowErrorType} from "~/store/app/project-show";
import {popupModule} from "~/store/popup";
import {cmdModule, ICmd} from "~/store/cmd";
import {AppCmd} from "~/configs/app-cmd";

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
        error: null as ProjectShowErrorType,
        authorization: 0,
        project: null as any,
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

    @Watch('cmd')
    public async watchCmd(now: ICmd | null) {

        const pj = $v.p(this.state, 'ssr.project', appProjectShowModule.prepare);
        console.log('%s.watchCmd', TAG,
            {
                now, pj
            });
        if (!now || !pj) {
            return;
        }

        appProjectShowModule.updateRecord(pj);
        this.project_data = {...pj};
        this.global = $v.p(pj, 'global', Project.global);
    }

    @Watch('project')
    public async watchProject() {
        if (!this.project) {
            return;
        }

        await this.initShow();
    }

    @Watch('active')
    public watchActive(value: any) {
        this.moveActive();
    }

    @Watch('isFullscreen')
    public watchIsFullscreen(value: any) {

        console.log('%s.watchIsFullscreeen', TAG, value ? 'T' : 'F');

        if (value) {
            if (!!document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            }
            this.fullscreen_txt = 'fullscreen'; //cancel
        } else {
            if (!!document.exitFullscreen) {
                document.exitFullscreen();
            }
            this.fullscreen_txt = 'fullscreen';
        }

        this.onFullscreen();
    }


    // Computed /////////////////////////////////////////////////////////
    public get isReady(): boolean {
        return this.state.view.ready;
    }

    public get active(): any {
        return previewModule.active;
    }

    public get imgPath(): string {
        return this.img($v.p(this.items, `${previewModule.active}.img.x1`));
    }

    public get imgPathX2(): string {
        return this.img($v.p(this.items, `${previewModule.active}.img.x2`));
    }

    public get isFullscreen(): boolean {
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

            console.log('%s.moveActive', TAG);
            if (!!this.project) {
                setTimeout(() => {
                    this.state.view.ready = true;

                }, 700);
            }

        }, 640);

        //fade in ///////////////////////
    }

    public updateItem() {

        if (this.items.length === 0) {
            return;
        }

        if (this.items[previewModule.active].txt) {
            this.cvTxt = {
                '--txt': this.items[previewModule.active].txt,
            }

        } else {
            this.cvTxt = {
                '--txt': this.project_data.global.txt,
            }
        }

        if (this.items[previewModule.active].bg) {
            this.cvBg = {
                '--bg': this.items[previewModule.active].bg,
            }

        } else {
            this.cvBg = {
                '--bg': this.project_data.global.bg,
            }
        }

        if (this.items[previewModule.active].shadow) {
            this.isShadow = true;

        } else {
            this.isShadow = false;
        }


        if (this.items[previewModule.active].web) {
            this.isWeb = true;
            this.isUi = false;
            this.isShadow = true;

        } else {
            this.isWeb = false;
            this.isUi = true;
        }


        if (this.items[previewModule.active].scroll) {
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
    public get project(): any {
        return appProjectShowModule.record;
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

    public get items(): any[] {
        return $v.p(this.project_data, 'items', []) || [];
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

    public get targetCmds(): ICmd[] {
        return cmdModule.queues.filter((_: ICmd) => {
            return [
                AppCmd.PresentationReady.toString(),
            ].indexOf(_.cmd) >= 0
        });
    }

    public get cmd(): ICmd | null {
        return this.targetCmds.length > 0 ? this.targetCmds[0] : null;
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
        const error = !$v.p(res, 'result') ? $v.p(res, 'code', 'notFound') : null;

        console.log('%s.project >', TAG, {
            error,
            user,
            pj,
            res,
            req: $v.p(res, 'ex.req'),
        });

        return OfficialAsyncAdataUtil.load(ctx, {
            ...state,
            ...{
                param: {
                    user,
                    pj,
                    page,
                },
                ssr: {
                    error,
                    authorization: $v.p(res, 'ex.authorization', 0),
                    project: $v.p(res, 'ex.project'),
                },
            },
        });
    }

    public async created() {
        appProjectModule.updateMode('show');
        await this.initPj();
        this.updateItem();
    }

    public async initPj() {
        console.log('%s.initPj', TAG, this.state.ssr.project);

        if (this.state.ssr.authorization) {
            console.log('%s.initPj｜authorization', TAG),
                appProjectShowModule.updateAuthorization($v.nbool(this.state.ssr.authorization));
            await popupModule.open({
                id: 'auth',
                component: 'Auth',
            });
        }

        if (!!this.state.ssr.error) {
            appProjectShowModule.updateError($v.p(this.state, 'ssr.error'));
            await popupModule.open({
                id: 'error',
                component: 'E400',
            });
        }

        if (!!this.state.ssr.project) {
            // appProjectShowModule.updateRecord($v.p(this.state, 'ssr.project'));
            await popupModule.open({
                id: 'fs',
                component: 'Fullscreen',
                option: {
                    project: $v.p(this.state, 'ssr.project'),
                },
            });
        }
    }

    public head() {
        // console.log('head > ', this.state.ssr, $v.p(this.state.ssr, 'project.global.title'));
        return {
            title: $v.p(this.state.ssr, 'project.global.title'),
        };
    }

    public async mounted() {
        await this.initParam();
        await this.initShow();
    }

    public async initParam() {
        debugModule.updateCode($v.p(this.$route, 'query.debug'));
        previewModule.updateActive(this.state.param.page);
    }

    public async initShow() {
        officialModule.updateIsNavScrollSwitch(true);
        officialModule.updateUseNavScrollSwitch(true);
        this.moveActive();
    }
}
