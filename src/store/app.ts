import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {$v} from "~/classes/utils/var-util";
import {Locale} from "~/configs/master-const";

const LS_KEY = 'app';

export type FrameType = 'main' | 'instagram' | 'contactForm';

export interface IWindowSize {
    width: number;
    height: number;
}

export interface IAppWindow {
    size: IWindowSize;
    screen: IWindowSize;
    fullscreen: boolean;
}

export interface IIFrame {
    type: FrameType;
    instagram: number | null;
    contactForm: number | null;
}

// state's interface
export interface IAppModule {
    routeStep: number;
    input: any;
    window: IAppWindow;

    lang: Locale;
    navOpen: boolean;
    loading: boolean;
    loaded: boolean;
    deviceOs: string;
    deviceDevice: string
    deviceSize: string;
    pageid: string;

    // スプラッシュフラグ（日時)
    splash: string;
    // PV単位でのスプラッシュフラグ
    isSplash: boolean;

    // Toコンソール使用
    isConsole: boolean;

    // FrameType
    iframe: IIFrame;
}

@Module({dynamic: true, store, name: 'app', namespaced: true})
class Store extends VuexModule implements IAppModule {

    public routeStep: number = 1;
    public input: any = {
        photo: null,
    };
    public window: IAppWindow = {
        size: {
            width: 0,
            height: 0,
        },
        screen: {
            width: 0,
            height: 0,
        },
        fullscreen: false,
    };

    public lang: Locale = Locale.Ja;
    public navOpen: boolean = false;
    public loading: boolean = false;
    public loaded: boolean = false;
    public isActiveOLoadingFrame = true;
    public pageid: string = '';
    public deviceOs: string = 'win';
    public deviceDevice: string = '';
    public deviceSize: string = 'pc';
    public splash: string = '';
    public isSplash: boolean = true;
    public isConsole: boolean = false;

    // tests
    public testNum: number = 0;

    public iframe: IIFrame = {
        type: 'main',
        instagram: null,
        contactForm: null,
    };

    // Computed ////////////////////////////////////////
    // #331
    public get windowOrientation(): 0 | 1 {
        return (M.window.screen.height >= M.window.screen.width) ? 0 : 1;
    }

    public get windowOrientationL(): 'portrait' | 'landscape' {
        return M.windowOrientation === 0 ? 'portrait' : 'landscape';
    }

    public get isWindowOrientationPortrait(): boolean {
        return M.windowOrientation === 0;
    }

    public get isWindowOrientationLandscape(): boolean {
        return M.windowOrientation === 1;
    }
    // # ---------------------------------------

    // Mutations ///////////////////////////////////////////
    @Mutation
    public updateLang(value: Locale) {
        this.lang = value;
    }

    @Mutation
    public updateRouteStep(value: number) {
        this.routeStep = value;
    }

    @Mutation
    public updateInput(value: number) {
        this.input = value;
    }

    @Mutation
    public updateWindow(value: IAppWindow) {
        this.window = value;
    }

    @Mutation
    public updateWindowSize(value: IWindowSize) {
        this.window = $v.put(this.window, 'size', value);
    }

    @Mutation
    public updateScreenSize(value: IWindowSize) {
        this.window = $v.put(this.window, 'screen', value);
    }

    @Mutation
    public updateWindowFullscreen(value: boolean) {
        this.window = $v.put(this.window, 'fullscreen', value);
    }

    @Mutation
    public updateSplash(value: string = '') {
        this.splash = value;
        M.saveLs().then();
    }

    @Mutation
    public updateIsSplash(value: boolean = true) {
        this.isSplash = value;
    }

    // Hashimoto

    @Mutation
    public updateNavOpen(value: boolean) {
        this.navOpen = value;
    }

    @Mutation
    public updateLoading(value: any) {
        this.loading = value;
    }

    @Mutation
    public updateLoaded(value: any) {
        this.loaded = value;
    }

    @Mutation
    public updateDeviceOs(value: string) {
        this.deviceOs = value;
    }

    @Mutation
    public updateDeviceDevice(value: string) {
        this.deviceDevice = value;
    }

    @Mutation
    public updateDeviceSize(value: string) {
        this.deviceSize = value;
    }

    @Mutation
    public updatePageid(value: string) {
        this.pageid = value;
    }

    @Mutation
    public incRouteStep() {
        this.routeStep = this.routeStep + 1;
    }

    @Mutation
    public updateIsConsole(value: boolean) {
        this.isConsole = value;
    }

    @Mutation
    public updateIsActiveOLoadingFrame(value: boolean) {
        this.isActiveOLoadingFrame = value;
    }

    @Mutation
    public updateTestNum(value: number) {
        this.testNum = value;
    }

    @Mutation
    public updateIFrame(value: IIFrame) {
        this.iframe = value;
    }

    @Mutation
    public updateIFrameType(value: FrameType) {
        this.iframe = $v.put(this.iframe, 'type', value);
    }

    @Mutation
    public updateIFrameInstagram(value: number) {
        this.iframe = $v.put(this.iframe, 'instagram', value);
    }

    @Mutation
    public updateIFrameContactForm(value: number) {
        this.iframe = $v.put(this.iframe, 'contactForm', value);
    }

    // Actions ////////////////////////////////////////////////////////////
    @Action
    public async applyInput(value: { name: string, value: any }) {
        appModule.updateInput(
            Object.assign({}, this.input, {
                [value.name]: value.value,
            }));
    }

    @Action
    public async saveLs() {
        localStorage.setItem(LS_KEY, JSON.stringify({
            splash: M.splash,
        }));
    }

    @Action
    async loadLs() {
        try {
            const src = localStorage.getItem(LS_KEY);
            if ($v.isEmpty(src)) {
                return;
            }

            const jobj = JSON.parse(String(src));
            if (!$v.isObject(jobj)) {
                return;
            }

            M.updateSplash($v.p(jobj, 'splash'));

        } catch (e) {
        }
    }
}

export const appModule = getModule(Store);

const M = appModule;
