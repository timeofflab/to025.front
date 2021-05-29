import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {officialModule} from "~/store/official";
import {appModule} from "~/store/app";
import WindowUtil from "~/classes/utils/window-util";
import {$v} from "~/classes/utils/var-util";
import {AOfficialLayout} from "~/classes/components/a-official-layout";
import {loadingModule} from "~/store/loading";

const TAG = 'ServiceFrame';

@Component({
    components: {}
})
export default class ServiceFrame extends AOfficialLayout {

    public scrollCid: string = 'official'
    public contentHeight: number = 1000;


    // @Watch('window')
    // public watchWindow() {
    //     console.log('%s.watchWindow', TAG);
    //     this.setContentHeight();
    // }
    //
    // @Watch('contentHeight')
    // public watchContentHeight() {
    //     console.log('%s.watchContentHeight', TAG);
    //     if (typeof (window.parent) !== 'undefined'
    //         //@ts-ignore
    //         && typeof (window.parent.updateIFrame) != 'undefined') {
    //         console.log('%s.watchContentHeight > parent.updateItem()', TAG, appModule.iframe.type, this.contentHeight);
    //         //@ts-ignore
    //         window.parent.updateIFrame(appModule.iframe.type, this.contentHeight);
    //     }
    // }

    // Methods ////////////////////////////////////////////////////
    public async created() {
        //this.execPageLoading();
    }

    // Events ///////////////////////////////////////////////////////


    // Computed /////////////////////////////////////////////////////////////////

    public get window(): any {
        return appModule.window;
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
}
