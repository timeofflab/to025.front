import {cInstagramModule} from "~/store/c/instagram";
import {To985Util} from "~/classes/domain/to985/to985-util";
import {to985Module} from "~/store/to985";

const TAG = 'SsrBridgeUtil';

/**
 *
 */
export class SsrBridgeUtil {

    public static init() {
        // @ts-ignore
        window!['bridgeSsr'] = self;
    }

    /**
     * Bridge(Main)
     * @param posts
     * @param paging
     */
    public static bridgeInstagram(posts: any[], paging: any = null) {
        cInstagramModule.updatePosts(posts);
        if (!!paging) {
            cInstagramModule.updatePaging(paging);
        }
    }

    /**
     * IFrame -> parent
     * @param posts
     * @param paging
     */
    public static dispatchInstagram(posts: any[], paging: any = null) {
        self.wp.bridgeSsr.bridgeInstagram(posts, paging);
    }

    /**
     * Bridge(Main)
     * @param src
     */
    public static bridgeTo985(src: any) {
        console.log('%s.bridgeTo985｜', TAG, src);
        To985Util.initClient(src);
        to985Module.updateIframe(true);
    }

    /**
     * IFrame -> parent
     * @param src
     */
    public static dispatchTo985(src: any) {
        console.log('%s.dispatchTo985｜', TAG, src);
        self.wp.bridgeSsr.bridgeTo985(src);
    }

    public static get wp(): any {
        return (window.parent as any);
    }
}

const self = SsrBridgeUtil;
