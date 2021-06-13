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
        this.state.view.ready = ($v.p(now, 'state') !== PopupState.Close.toString());

        const accept = $v.p(now, 'result.accept');
        if (!!accept) {
            console.log('***************************')
            await cmdModule.registCmd({
                cmd: AppCmd.PresentationReady,
            });
        }
    }

    public async commit() {
        await popupModule.patch({
            id: this.cid,
            result: {
                accept: true,
            },
        });
        await popupModule.close();
    }

    // Events //////////////////////////////////////
    public async onClickClose() {
        await this.commit();
    }

    public async onClickFullscreen() {
        if (!document.fullscreenElement) {
            previewModule.updateFullscreen(true);
        } else {
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
