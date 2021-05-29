import {Component} from 'nuxt-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";
import {appModule} from "~/store/app";
import {$v} from "~/classes/utils/var-util";
import {popupModule} from "~/store/popup";
import {UiUtil} from "~/classes/utils/ui-util";

@Component
export default class MainFrame extends AToComponent {

    public async mounted() {
        this.initParam().then();
    }

    public async initParam() {
        appModule.updateIsConsole(($v.p(this.$route, 'query.debug') === 'on'));
    }

    // --- //////////////////////////////////////////////////
    public onResize() {

    }

    // Computed //////////////////////////////////////////////
    public get classMf(): any {
        return [
            {
                '-is-console': this.isConsole,
                '-touch-device': this.isTouchDevice,
                '-is-popup': this.isPopup,
            },
            '-' + this.deviceSize,
            '-os-' + this.deviceOs,
            '-device-' + this.deviceDevice,
        ];
    }

    public get isTouchDevice(): boolean {
        return UiUtil.isTouchDevice;
    }

    public get isPopup(): boolean {
        return popupModule.popups.length > 0;
    }

    public get isConsole(): boolean {
        return appModule.isConsole;
    }

    public get deviceSize(): any {
        return appModule.deviceSize;
    }

    public get deviceOs(): any {
        return appModule.deviceOs;
    }

    public get deviceDevice(): any {
        return appModule.deviceDevice;
    }
}
