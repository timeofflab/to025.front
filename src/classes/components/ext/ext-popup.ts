import {AExt} from "@/classes/components/ext/a-ext";
import {Vue} from "vue-property-decorator";
import {$v} from "~/classes/utils/var-util";

export class ExtPopup extends AExt {

    constructor(vue: Vue) {
        super(vue);
    }

    // Getters ////////////////////////////////////////////////////////
    public get id(): boolean {
        return $v.p(this.vue, 'cid');
    }
}
