import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {APopupComponent} from "~/classes/components/a-popup-component";
import {IPopup, popupModule, PopupState} from "~/store/popup";
import {$v} from "~/classes/utils/var-util";

type OkAction = 'close' | 'none';
const CN = 'popup/Alert';

@Component
export default class Alert extends APopupComponent {
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

    // OK時の値
    public get ok(): OkAction {
        return $v.p(this.popupOption, 'ok') || 'ok';
    }

    public get okAction(): OkAction {
        return $v.p(this.popupOption, 'okAction') || 'close';
    }

    //hideBtnClose
    public get hideBtnClose(): boolean {
        return !!$v.p(this.popupOption, 'hideBtnClose');
    }

    public get hideBtnOk(): boolean {
        return !!$v.p(this.popupOption, 'hideBtnOk');
    }

    public get btnOkL(): string {
        return $v.p(this.popupOption, 'btnOkL') || 'OK';
    }
}
