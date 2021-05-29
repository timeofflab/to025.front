import {AExt} from "@/classes/components/ext/a-ext";
import {Vue} from "vue-property-decorator";
import MobileDetect from "mobile-detect";

export class ExtDevice extends AExt {

    private md: MobileDetect;

    constructor(vue: Vue) {
        super(vue);
        this.md = new MobileDetect(window.navigator.userAgent);
    }

    public get isMobile(): boolean {
        return !!this.md.mobile();
    }
}
