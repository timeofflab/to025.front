import {Component, Watch, Prop, Vue} from '@/node_modules/nuxt-property-decorator';
import {$v} from "~/classes/utils/var-util";
import WindowUtil from "~/classes/utils/window-util";
import {appModule} from '@/store/app';
import {mvSliderModule} from '@/store/mv-slider';

@Component
export default class MvSliderSlide extends Vue {

    @Prop({default: () => ({}) })
    public d: any;

    @Prop({default: 0})
    public i: number;

    public styleLinkMarginTop: any = {};


    // Computed /////////////////////////////////////////////////////////

    public get active(): any {
        return mvSliderModule.active;
    }

    public get isActive(): any {

        if (mvSliderModule.active == this.i) {
            return true;
        }

        return false;
    }

    public get exActive(): any {
        return mvSliderModule.exActive;
    }

    public get deviceSize(): any {
        return appModule.deviceSize;
    }

    // Event /////////////////////////////////////////////////////////

    @Watch('deviceSize')
    public watchDeviceSize(value: string) {

        if (value == 'mb') {

        } else {
        }

    }


    // Methods /////////////////////////////////////////////////////////

    public mounted() {

    }


}
