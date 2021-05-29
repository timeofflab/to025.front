import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {$v} from "~/classes/utils/var-util";

const TAG = 'bubble';

@Component
export default class Bubble extends Vue {

    @Prop({default: ''})
    public body: string;

    /*
        single-l
        single-s
        multi
    */
    @Prop({default: 'single-s'})
    public type: string;

    @Prop({default: 'top'})
    public v: string;

    @Prop({default: 'left'})
    public a: string;

    @Prop({default: false})
    public display: boolean;



    public get isDisplay(): any {
        return this.display;
    }

}
