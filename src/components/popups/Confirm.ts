import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {APopupComponent} from "~/classes/components/a-popup-component";
import {IPopup, popupModule, PopupState} from "~/store/popup";
import {$v} from "~/classes/utils/var-util";

const CN = 'popup/Confirm';

@Component
export default class Confirm extends APopupComponent {
    @Prop({default: '@'})
    public cid: string;

    public state = {};

    @Watch('popup')
    public watchPopup(now: IPopup) {
        console.log('[%s] - watchPopup() > now > ', CN, now);
        this._APopupComponent_watchPopup(now);
    }

    public async mounted() {
        this.$nextTick(() => {
            this.isOpen = true
        });
    }

    // Events //////////////////////////////////////////////
    public async onClickOk() {

        popupModule.patch({
            id: this.cid,
            result: this.ok,
        });

        if (this.okAction === 'close') {
            await this.onClickClose();
        }
    }

    public async onClickCancel() {
        popupModule.patch({
            id: this.cid,
            result: this.cancel,
        });

        if (this.cancelAction === 'close') {
            await this.onClickClose();
        }
    }

    public async onAnimatedOpen() {
        console.log('[%s] onAnimatedOpen', CN);
        popupModule.update({
            ...this.popup!,
            ...{
                state: PopupState.Open,
            },
        });
    }

    public async onAnimatedClose() {
        console.log('[%s] onAnimatedClose', CN);
        popupModule.update({
            ...this.popup!,
            ...{
                state: PopupState.Closed,
            },
        });
    }

    // Computed ///////////////////////////////////////////////
    public get popup(): IPopup | null {
        return popupModule.popups.findByKey('id', this.cid);
    }

    public get popupOption(): any {
        return $v.p(this.popup, 'option');
    }

    public get popupOptionRecord(): any {
        return $v.p(this.popupOption, 'record');
    }

    public get classContent(): any {
        return {
            show: (this.popup!.state === PopupState.Open),
        };
    }

    public get title(): string {
        return $v.p(this.popupOption, 'title') || '';
    }

    public get message(): string {
        return $v.p(this.popupOption, 'message') || '';
    }

    // option - OKボタン周り
    public get ok(): string {
        return $v.p(this.popupOption, 'ok') || 'ok';
    }

    public get okAction(): string {
        return $v.p(this.popupOption, 'okAction') || 'close';
    }

    public get btnOkL(): string {
        return $v.p(this.popupOption, 'btnOkL') || 'OK';
    }

    // option - キャンセルボタン周り
    public get cancel(): string {
        return $v.p(this.popupOption, 'cancel') || 'cancel';
    }

    public get cancelAction(): string {
        return $v.p(this.popupOption, 'cancelAction') || 'close';
    }

    public get btnCancelL(): string {
        return $v.p(this.popupOption, 'btnCancelL') || 'CANCEL';
    }
}
