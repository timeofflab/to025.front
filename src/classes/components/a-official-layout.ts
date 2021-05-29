import {AOfficialComponent} from "~/classes/components/a-official-component";
import WUtil from "~/classes/view/w-util";
import {appModule} from "~/store/app";
import UseragentUtil from "~/classes/view/useragent-util";
import WindowUtil from "~/classes/utils/window-util";

export class AOfficialLayout extends AOfficialComponent {

    public isPageLoading: boolean = false;
    public isFirstNavigation: boolean = false;

    public execPageLoading() {
        if (!WUtil.isBrowser || appModule.routeStep <= 1) {
            return;
        }

        // 塩梅でContentNavを閉じる
        setTimeout(() => {
            appModule.updateNavOpen(false);
        }, 500);

        this.isPageLoading = true;

        setTimeout(() => {
            this.isPageLoading = false;
            //this.isFirstNavigation = true;
        }, 2500);

        setTimeout(() => {
            this.isFirstNavigation = true;
        }, 50);
    }

    public setDevice() {
        appModule.updateDeviceOs(UseragentUtil.os());
        appModule.updateDeviceDevice(UseragentUtil.device());
    }

    public resize() {
        WindowUtil.resizeWindow();
    }

    public resizedWindow() {
        WindowUtil.resizeWindow();
    }

    // Computed //////////////////////////////////////////////////
    public get isShow(): boolean {
        if (!WUtil.isBrowser || !this.isProgressRoute) {
            return true;
        }

        return this.isFirstNavigation;
    }

    public get isProgressRoute(): boolean {
        return WUtil.isBrowser
            && appModule.routeStep > 1;
    }
}
