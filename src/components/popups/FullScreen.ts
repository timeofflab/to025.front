import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {APopupComponent} from "~/classes/components/a-popup-component";
import {IPopup, popupModule, PopupState} from "~/store/popup";
import {$v} from "~/classes/utils/var-util";
import {previewModule} from "~/store/preview";
import {cmdModule} from "~/store/cmd";
import {AppCmd} from "~/configs/app-cmd";

const TAG = 'c/Popup/FullScreen';

@Component
export default class FullScreen extends APopupComponent {

    @Prop()
    public cid: string;

    public state = {
        view: {
            ready: false,
        },
    };

    @Watch('_APopupComponent_popup')
    public async watchPopup(now: IPopup) {

        const accept = $v.p(now, 'result.accept');
        if (!!accept) {
            console.log('***************************')
            await cmdModule.registCmd({
                cmd: AppCmd.PresentationReady,
            });
        }

        const state = $v.p(now, 'state');
        console.log('%s｜watchPopup', TAG, {
            cid: this.cid,
            now,
            state
        });

        switch (state) {
            case PopupState.Close:
                this.state.view.ready = false;
                popupModule.patch({
                    id: this.cid,
                    state: PopupState.Closed,
                });
                break;
            case PopupState.Closed:
                setTimeout(() => {
                    console.log('%s｜////////////////////////////////', TAG, this.cid);
                    popupModule.remove(this.cid);
                }, 1000);
                break;
            default:
                this.state.view.ready = true;
                break;
        }
    }

    public async commit() {
        await popupModule.patch({
            id: this.cid,
            result: {
                accept: true,
            },
        });
        await popupModule.close(this.cid);
    }

    // Events //////////////////////////////////////
    public async onClickClose() {
        await this.commit();
    }

    public async onClickFullscreen() {
        console.log('%s.onClickFullscreen', TAG);
        if (!document.fullscreenElement) {
            console.log(' - #');
            previewModule.updateFullscreen(true);
        } else {
            console.log(' - ###');
            previewModule.updateFullscreen(false);
        }
        await this.commit();
    }

    // Computed ////////////////////////////////////
    public get isReady(): boolean {
        return this.state.view.ready;
    }

    // Init
    public async mounted() {
        this.state.view.ready = true;
    }
}
