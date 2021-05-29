import Vue from 'vue';
import {Component, Watch, Prop} from "nuxt-property-decorator";
import {bodyModule} from '@/store/body';
import WindowUtil from "~/classes/utils/window-util";

@Component({
    components: {}
})
export default class Inview extends Vue {

    @Prop({default: 'div'})
    public tag: string;

    public y: number = 0;
    public gap: number = -40;
    public view: boolean = false;
    public lock: boolean = true;


    // Events /////////////////////////////////////////////////////////////////

    @Watch('scrollTop')
    public watchScrollEvent(value: number) {

        /*
            自分が画面内にはいったらFADE IN
            (scrollY + window.outerHeight) > 自分Y
        */
//         if (!this.view) {
//             this.checkPosition(value);
//         }
        if (!this.lock) {
            this.checkPosition(value);
        }
    }


    // Computed /////////////////////////////////////////////////////////////////

    public get scrollTop(): any {
        return bodyModule.scrollTop;
    }

    public get scrollIsDown(): any {
        return bodyModule.scrollIsDown;
    }


    // Methods /////////////////////////////////////////////////////////////////

    public created() {
        this.lock = true;
    }

    public mounted() {

        this.view = false;

        if (!this.view) {

            this.$nextTick(() => {

                setTimeout(() => {

                    const targetElement: any = this.$refs.el as HTMLElement;

                    if (!targetElement) { return; }

                    this.y = WindowUtil.getYPos(targetElement);

                    this.lock = false;
                    this.checkPosition(window.pageYOffset);

                }, 1200);
            });
        }
    }

    public checkPosition(scrollTop: number) {

        const windowHeight = document.documentElement.clientHeight;

        if ((scrollTop + windowHeight - this.gap) > this.y) {

            //console.log(`Active |  ${(scrollTop + (this.$window.height()) - this.gap)} > This: ${this.y}`);

            this.active(scrollTop);
        }
    }

    private active(scrollTop: number) {

        // 一番上にあるときは少し遅らせる
        if (scrollTop < 10) {

            setTimeout(() => {
                this.view = true;

            }, 400);

        } else {
            this.view = true;
//             const random = Math.ceil( Math.random () * 600 );
//
//             setTimeout(() => {
//                 this.view = true;
//
//             }, random);
        }
    }
}



