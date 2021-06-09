import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {officialModule} from "~/store/official";
import {appModule} from "~/store/app";
import WindowUtil from "~/classes/utils/window-util";
import {$v} from "~/classes/utils/var-util";
import {AOfficialLayout} from "~/classes/components/a-official-layout";
import Console from "~/components/pages/share/Console";
import {scrollModule} from "~/store/scroll";
import {bodyModule} from "~/store/body";
import {loadingModule} from "~/store/loading";
import Throttle from "~/classes/core/throttle";
import {MasterConst} from "~/configs/master-const";
import {previewModule} from '@/store/preview';
import {appProjectModule} from "~/store/app/project";
import Auth from "~/components/popups/Auth";
import FullScreen from "~/components/popups/FullScreen";
// import NavScrollSwitch from '@/components/module/NavScrollSwitch.vue';

const TAG = 'OfficialMainFrame';

@Component({
    components: {
        Console,
//         NavScrollSwitch,
        Auth,
        FullScreen,
    }
})
export default class OfficialMainFrame extends AOfficialLayout {

    @Prop({default: true})
    public useNav: boolean;

    public scrollThrottle: Throttle;
    public timer: any;
    public scrollCid: string = 'official'
    public aduse: boolean = true;
    public isPageLoading = false;
    public scrollOption: any = {
        scrollbars: {
            //visibility: 'auto',
            //autoHide: 'scroll',
            //autoHideDelay: 800,
        },
        overflowBehavior: {
            x: 'hidden',
        },
        callbacks: {
            onScroll: this.onScrollMpf,
        }
    };

    public isMounted: boolean = false;
    public gnav: boolean = false;
    public display: boolean = false;
    public popup_fullscreen: boolean = false;
    public fullscreen_txt: string = 'maximize';


    @Watch('routeStep')
    public watchRouteStep() {

        setTimeout(() => {
            if (!!this.vRefOs) {
                WindowUtil.scrollToTop(this.vRefOs);
            }
        }, 300);

        this.execPageLoading();
    }

    @Watch('isLoaded')
    public watchLoaded(value: boolean) {

        if (value) {

            setTimeout(() => {
                this.popup_fullscreen = true;

            }, 800);
        }
    }

    @Watch('scrollTop')
    public watchScrollTop(now: number) {
        console.log('[%s] scrollTop > name=%s', TAG, this.scrollCid, now);
        if (now < -10000) {
            return;
        }

        console.log(now);

        this.refOs.osInstance().scroll({y: now}, 1000);
        scrollModule.clear(this.scrollCid);
    }

    public onScrollMpf() {
        this.scrollThrottle.debounce(() => {
            const scrollInfo = (this.$refs['os'] as any).osInstance().scroll();
            const y = scrollInfo.position.y;

            // console.log('[%s.onScrollMpf] y=%s', TAG, y);

            if (bodyModule.scrollTop < y) {
                //console.log(`Down | bodyModule.scrollTop: ${bodyModule.scrollTop} < value: ${value}`);
                bodyModule.updateScrollIsDown(true);

            } else {
                //console.log(`UP | bodyModule.scrollTop: ${bodyModule.scrollTop} > value: ${value}`);
                bodyModule.updateScrollIsDown(false);
            }

            bodyModule.updateScrollTop(y);
        });
    }

    // Methods ////////////////////////////////////////////////////

    public onFullscreen() {

        this.onClose();

        setTimeout(() => {

            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                previewModule.updateFullscreen(true);

            } else {
                document.exitFullscreen();
                previewModule.updateFullscreen(false);
            }
        }, 800);
    }

    public onClose() {
        this.popup_fullscreen = false;

    }

    public checkFullscreen() {

        if (!document.fullscreenElement) {
            previewModule.updateFullscreen(true);

        } else {
            previewModule.updateFullscreen(false);
        }
    }

    public async created() {
        this.scrollThrottle = new Throttle(100);
        this.execPageLoading();
    }

    public async mounted() {

        if (!process.client) {
            return;
        }

        //OS, Device
        this.setDevice();

        //Force Resize Event
        this.resizedWindow()

        this.timer = null;
        scrollModule.clear(this.scrollCid);
        this.checkFullscreen();
    }

    public async openTicketPopup() {
    }


    // Events ///////////////////////////////////////////////////////

    public onToggle() {
        let value: boolean = appModule.navOpen;
        value = !value;
        appModule.updateNavOpen(value);
    }


    // Computed /////////////////////////////////////////////////////////////////
    public get isModeShow(): boolean {
        return appProjectModule.mode === 'show';
    }

    public get refOs(): any {
        return $v.p(this.$refs, 'os');
    }

    public get routeStep(): number {
        return appModule.routeStep;
    }

    public get vRefOs(): any {
        return $v.p(this.$refs, 'os');
    }

    public get isLoading(): boolean {
        return loadingModule.loadings.length > 0;
    }

    public get deviceSize(): any {
        return appModule.deviceSize;
    }

    public get deviceOs(): any {
        return appModule.deviceOs;
    }

    public get isLoaded(): any {
        return appModule.loaded;
    }

    public get pageId(): any {
        return officialModule.pageId;
    }

    public get pageLayout(): any {
        return officialModule.pageLayout;
    }

    public get scrollTop(): number {
        return WindowUtil.scrollTop(this.scrollCid);
    }

    public get version(): string {
        return MasterConst.App.Version;
    }

    public get build(): string {
        return MasterConst.App.Build;
    }

    public get isFullscreen(): any {
        return previewModule.fullscreen;
    }
}
