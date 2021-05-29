import {Vue} from "vue-property-decorator";

export class AExt {
    protected vue: Vue;

    constructor(vue: Vue) {
        this.vue = vue;
    }
}
