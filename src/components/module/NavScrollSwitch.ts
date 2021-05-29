import {Component, Watch, Prop, Vue} from '@/node_modules/nuxt-property-decorator';
import {$v} from "~/classes/utils/var-util";
import {appModule} from '@/store/app';
import {scrollModule} from "~/store/scroll";
import {bodyModule} from "~/store/body";
import {officialModule} from "~/store/official";

@Component({
    components: {
    }
})
export default class NavScrollSwitch extends Vue {

    public switchY: number = 400;


//     @Prop({default: 'mv-slider'})
//     public instanceId: string;
// 

    @Watch('scrollTop')
    public watchScrollTop(value: any) {
        
        if (this.useNavScrollSwitch) {
            
            if ((this.windowHeight - 250) < value) {
                officialModule.updateIsNavScrollSwitch(false);
            } else {
                officialModule.updateIsNavScrollSwitch(true);
            }
        } else {
            officialModule.updateIsNavScrollSwitch(false);
        }
    }
    
    @Watch('routeStep')
    public watchRouteStep() {

        setTimeout(() => {
            if (!!this.vRefOs) {
                officialModule.updateIsNavScrollSwitch(false);
                officialModule.updateUseNavScrollSwitch(false);
            }
        }, 100);
    }


    // Computed /////////////////////////////////////////////////////////

    public get deviceSize(): any {
        return appModule.deviceSize;
    }

    public get scrollTop(): number {
        return bodyModule.scrollTop;
    }
    
    public get useNavScrollSwitch(): any {
        return officialModule.useNavScrollSwitch;
    }
    
    public get isNavScrollSwitch(): any {
        return officialModule.isNavScrollSwitch;
    }
    
    public get routeStep(): number {
        return appModule.routeStep;
    }

    public get vRefOs(): any {
        return $v.p(this.$refs, 'os');
    }

    public get windowHeight(): any {
        return appModule.window.size.height;
    }

    // Event /////////////////////////////////////////////////////////



    // Methods /////////////////////////////////////////////////////////

    public created() {
        officialModule.updateIsNavScrollSwitch(true);
    }

    public mounted() {
        
    }
}
