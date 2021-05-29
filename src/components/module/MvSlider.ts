import {Component, Watch, Prop, Vue} from '@/node_modules/nuxt-property-decorator';
import {$v} from "~/classes/utils/var-util";
import WindowUtil from "~/classes/utils/window-util";
import {appModule} from '@/store/app';
import {mvSliderModule} from '@/store/mv-slider';
import MvSliderSlide from '@/components/module/MvSliderSlide.vue';
import {TweenMax, TimelineMax} from 'gsap';
import {scrollModule} from "~/store/scroll";
import {bodyModule} from "~/store/body";

@Component({
    components: {
	    MvSliderSlide
    }
})
export default class MvSlider extends Vue {

    public classMousefollow: string = '-detail';
    public isMousefollow: boolean = false;
    public scrollCid: string = 'official'
    public x: number = 800;
    public y: number = 400;
    public mvSliderX: number = 0;
    public mvSliderY: number = 0;


    @Prop({default: 'mv-slider'})
    public instanceId: string;

    @Prop({default: () => ([]) })
    public d: any;

    @Prop({default: true})
    public loop: boolean;

    @Prop({default: 5000})
    public autoplayDelay: number;

    public timer: any;


    @Watch('active')
    public watchActive(value: any) {

        mvSliderModule.updateActiveType(this.d[value].type);
        mvSliderModule.updateActiveStyle(this.d[value].style);

        if (value + 1 >= this.d.length) {
            mvSliderModule.updateIsLast(true);

        } else {
            mvSliderModule.updateIsLast(false);
        }

        if (value <= 0) {
            mvSliderModule.updateIsFirst(true);

        } else {
            mvSliderModule.updateIsFirst(false);
        }
    }

    @Watch('autoplayState')
    public watchAutoplayState(value: any) {

        if (value) {
            this.autoplayInit();

        } else {
            clearInterval(this.timer);

        }
    }


    // Computed /////////////////////////////////////////////////////////

    public get ready(): any {
        return mvSliderModule.ready;
    }

    public get active(): any {
        return mvSliderModule.active;
    }

    public get exActive(): any {
        return mvSliderModule.exActive;
    }

    public get isLast(): any {
        return mvSliderModule.isLast;
    }

    public get isFirst(): any {
        return mvSliderModule.isFirst;
    }

    public get autoplayState(): any {
        return mvSliderModule.autoplayState;
    }

    public get deviceSize(): any {
        return appModule.deviceSize;
    }

    public get scrollTop(): number {
        return bodyModule.scrollTop;
    }

    public get refMvSlider(): HTMLElement {
        return $v.p(this.$refs, 'mvSlider');
    }


    // Event /////////////////////////////////////////////////////////




    // Methods /////////////////////////////////////////////////////////

    public created() {
        this.init();
//         console.log('mvSlider created');
    }

    public mounted() {

        const pos = WindowUtil.getPos(this.refMvSlider as HTMLElement);
        this.mvSliderX = pos.left;
        this.mvSliderY = pos.top;

        //console.log(this.mvSliderX);

        clearInterval(this.timer);
        clearInterval(this.timer);
        clearInterval(this.timer);
        clearInterval(this.timer);
        clearInterval(this.timer);
        clearInterval(this.timer);
        this.timer = null;
//         console.log('mvSlider mounted');

        let interval: any = setInterval( () => {

    		if (appModule.loaded) {
			    clearInterval(interval);

        		setTimeout( () => {
            		this.autoplayInit();
                }, 2000);
    		}

        }, 10);
    }

    public beforeDestroy() {
        clearInterval(this.timer);
        clearInterval(this.timer);
        clearInterval(this.timer);
        clearInterval(this.timer);
        clearInterval(this.timer);
        clearInterval(this.timer);
        this.timer = null;
        mvSliderModule.setActives(0);
        mvSliderModule.updateReady(false);
        mvSliderModule.updateAutoplayState(false);
//         console.log('beforeDestroy');
    }

    public init() {
        mvSliderModule.updateAutoplayState(false);
        mvSliderModule.updateReady(false);
        mvSliderModule.updateLength(this.d.length);
        mvSliderModule.setActives(0);
        mvSliderModule.updateLoop(this.loop);
    }

    public autoplayInit() {
        mvSliderModule.updateReady(true);
        mvSliderModule.updateAutoplayState(true);

        clearInterval(this.timer);
        clearInterval(this.timer);
        clearInterval(this.timer);
        clearInterval(this.timer);
        clearInterval(this.timer);
        clearInterval(this.timer);
        this.timer = null;

        this.timer = setInterval( () => {

            this.next();

        }, this.autoplayDelay);

    }

    public next() {

        if (mvSliderModule.loop || !mvSliderModule.isLast) {
            mvSliderModule.nextActive();
        }
    }

    public prev() {

        if (mvSliderModule.loop || !mvSliderModule.isFirst) {
            mvSliderModule.prevActive();
        }
    }

    public tweenClick() {
        const tl = new TimelineMax()
        tl.to('.mousefollow-container',0.08,{scale:0.92})
            .to('.mousefollow-container',0.19,{scale:1.0});
    }

    public onPager(value: any) {

        clearInterval(this.timer);
        clearInterval(this.timer);
        clearInterval(this.timer);
        clearInterval(this.timer);
        clearInterval(this.timer);
        mvSliderModule.updateReady(false);
        mvSliderModule.updateAutoplayState(false);

        if (value == 'next' || value == 'right') {
            this.next();

        } else if(value == 'prev' || value == 'left') {
            this.prev();
        }

        if (value == 'prev' || value == 'next') {
            this.tweenClick();
        }
    }

    public mousemove(e: any) {

        this.isMousefollow = true;

        //console.log(this.scrollTop);

        TweenMax.to('.mousefollow-wrapper', 0, {
            css: {
                left: e.pageX - this.mvSliderX,
                top: e.pageY - this.mvSliderY + this.scrollTop
            }
        });
    }

    public mouseover(e: any) {
        this.classMousefollow = '-' + e;
        TweenMax.to('.mousefollow-wrapper',0.3,{scale:1, autoAlpha:1});
    }

    public mouseleave() {
        TweenMax.to('.mousefollow-wrapper',0.2,{scale:0.1, autoAlpha:0});
    }

}
