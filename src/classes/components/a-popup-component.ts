import Vue from 'vue';
import {IPopup, popupModule, PopupState} from "~/store/popup";
import {$v} from "~/classes/utils/var-util";
import {AToComponent} from "~/classes/components/a-to-component";

export abstract class APopupComponent extends AToComponent {

    public abstract cid: string;
    public isOpen: boolean = false;

    public async mounted() {
        this.$nextTick(() => {
            this.isOpen = true
        });
    }

    public async destroyed() {
        await popupModule.clean();
    }

    public _APopupComponent_popupOption(name: string, def: any = null): any {
        return $v.p(this._APopupComponent_popup, 'option.' + name) || def;
    }

    // Events ////////////////////////////////////////////
    public async onWatchPopup(now: IPopup) {
        if (now.state === PopupState.Closed) {
            popupModule.remove(this.cid);
        }
    }

    public async onClickClose() {
        this.isOpen = false;
        await popupModule.close(this.cid);
        console.log('[APoupuComponent] - onClickClose',
            this.constructor.name,
            this._APopupComponent_popup);
    }

    public async onAnimatedOpen() {
        popupModule.update({
            ...this._APopupComponent_popup!,
            ...{
                state: PopupState.Open,
            },
        });
    }

    public async onAnimatedClose() {
        popupModule.update({
            ...this._APopupComponent_popup!,
            ...{
                state: PopupState.Closed,
            },
        });
    }

    // Getters ///////////////////////////////////////////
    public get _APopupComponent_classContent(): any {
        return {
            show: (this._APopupComponent_popup!.state === PopupState.Open),
        };
    }

    public get _APopupComponent_popups(): IPopup[] {
        return popupModule.popups;
    }

    public get _APopupComponent_popup(): IPopup | null {
        return popupModule.popups.findByKey('id', this.cid);
    }

    protected _APopupComponent_watchPopup(now: IPopup) {
        switch (now.state) {
            case PopupState.Close:
                this.isOpen = false;
                return;
            case PopupState.Closed:
                popupModule.remove(this.cid);
                return;
            default:
                break;
        }
    }
}
