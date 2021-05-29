import {Component, Watch} from "nuxt-property-decorator";
import {appModule} from '@/store/app';
import {AOfficialComponent} from "~/classes/components/a-official-component";
import {$vh, VueHelper} from "~/classes/utils/vue-helper";
import WUtil from "~/classes/view/w-util";
import {TweenLite} from 'gsap'

const TAG = 'OLoaderFrame';

const state = {
    config: {
        lang: 'components.oLoaderFrame',
    },
};

@Component
export default class OLoaderFrame extends AOfficialComponent {

    public isCover: boolean = true;
    public imgIntro: HTMLImageElement;
    public imgIntroReady: boolean = true;
    public isTrans: boolean = true;
    public duration: number = 0.7;
    public progress: number = 0;

    //表示用
    public nprogress: number = 0;

    @Watch('progress')
    public watchProgress() {

        TweenLite.to(this.$data, this.duration, {nprogress: this.progress});
    }

    @Watch('nprogress')
    public watchNprogress() {
        if (this.nprogress == 100) {
            setTimeout(() => {
                appModule.updateLoading(false);
                appModule.updateLoaded(true);
            }, 180);
        }
    }

    public created() {
        if (!WUtil.isBrowser) {
            return;
        }
    }

    public mounted() {

        this.startLoading();
        console.log('[%s] mounted()', TAG)
        console.log('[%s] splash=%s >  is Show Splash', TAG, appModule.splash, this.isShow() ? 'T' : 'F');
    }

    public startLoading() {
        if (this.imgIntroReady) {
            console.log('load!');
            appModule.updateLoading(true);
            this.autoProgress();
        } else {
            setTimeout(() => {
                this.startLoading();
            }, 0);
        }
    }

    /*
        オートプログレス
        自動で100まで進む
    */
    public autoProgress() {

        let loadingTime1 = 0;
        let loadingTime2 = 0;

        if (!this.isShow()) {
            loadingTime1 = 0;
            loadingTime2 = 0;
        }

        this.isTrans = true;
        this.nprogress = 0;

        setTimeout(() => {
            setTimeout(() => {
                this.progress = 24;

                setTimeout(() => {
                    this.progress = 100;

                }, loadingTime2);
            }, loadingTime1);
        }, 10);
    }

    public onEndTransition() {
        $vh.showSplash();
        this.isCover = false;
        console.log('[%s] onEndTransition() > ', TAG, appModule.splash);
    }

    public isShow(): boolean {
        return VueHelper.isShowSplash();
    }

    public onEndTransitionWrapper() {
        appModule.updateIsActiveOLoadingFrame(false);
    }

    // Computed ////////////////////////////////////////////////////////////////////////////////////

    public get vprogress(): any {
	    return +this.nprogress.toFixed(0);
    }

    public get isLoading(): any {
        return appModule.loading;
    }

    public get deviceSize(): any {
        return appModule.deviceSize;
    }

    public get isLoaded(): any {
        return appModule.loaded;
    }

    public get isActiveOLoadingFrame(): boolean {
        return appModule.isActiveOLoadingFrame;
    }

    public get classWrapper() {
        return {
            ['-leaving']: this.isLoaded,
        };
    }
}
