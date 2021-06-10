import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import WUtil from "~/classes/view/w-util";
import {cSImgModule, ICSImg} from "~/store/c/s-img";
import {$v} from "~/classes/utils/var-util";
import {EnvUtil} from "~/classes/utils/env-util";
import {AToComponent} from "~/classes/components/a-to-component";
import SImgUtil from "~/classes/utils/s-img-util";

@Component
export default class NImg extends AToComponent {

    @Prop({default: '@'})
    public host: string;

    @Prop({default: '/common/img'})
    public base: string;

    @Prop({default: ''})
    public src: string;

    @Prop({default: ''})
    public srcX2: string;

    @Prop({default: ""})
    public alt: string;


    @Prop({default: ""})
    public title: string;

    @Prop({default: 'auto'})
    public srcset: boolean | string;

    @Prop({default: false})
    public loading: boolean;

    @Prop({default: false})
    public aspect: boolean;

    @Prop({default: true})
    public size: boolean;

    public classAspect: string = '-';
    public isLoading: boolean = false; // = this.loading;
    public mainReady: boolean = false;

    // - debug
    public debugReady: boolean = false;

    @Watch('sImg.ready')
    public watchImgSrc(now: boolean) {
        // console.log('[%s.watchImgSrc]', now);
        if (now) {
            this.onLoad(this.sImg);
        }
    }

    public async mounted() {

        // console.log('[%s.mounted()] src=', TAG, this.src);

        if (WUtil.isBrowser && this.isProgressive) {
            await cSImgModule.add(this.osrc);
        }

        this.isLoading = this.loading;
        this.updateSize();

        setTimeout(() => {
            this.mainReady = true;
        }, 100);

        // setTimeout(() => {
        //     this.debugReady = true;
        // }, 3000);
    }

    public updateSize() {
        if (this.aspect) {
            this.setRatio();
        }
    }

    public setRatio() {

        if (!this.width || !this.height) {
            return;
        }

        const ratio: number = this.width / this.height;

        if (ratio < 0.87) {
            this.classAspect = '-vertical';

        } else if (ratio > 1.13) {
            this.classAspect = '-horizontal';

        } else {
            this.classAspect = '-square';
        }
    }

    // Computed /////
    public get cid(): string {
        return '';
    }

    public get isProgressive(): boolean {
        return false;
    }

    // public get sImgs(): ICSImg[] {
    //     return cSImgModule.imgs;
    // }

    public get sImg(): ICSImg | null {
        return cSImgModule.imgs.findByKey('id', this.cid);
    }

    public get hasMain(): boolean {
        return !!$v.p(this.sImg, 'main');
    }

    public get imgSrc(): string {
        return this.src;
    }

    public get imgThumbSrc(): string {
        // console.log('[%s.imgSrc] > c', TAG);
        return $v.p(this.sImg, 'thumb.src', '');
    }

    public get isReady(): boolean {
        return $v.p(this.sImg, 'ready') || this.debugReady;
    }

    public get baseFull(): string {
        if (this.host === '@') {
            return SImgUtil.src(this.base);
        } else {
            return this.base;
        }
    }

    public get osrc(): string {

        // console.log('SImg > src=', Env.MEDIA_BASE, this.src);
        const src = (!this.isProgressive) ? this.src : SImgUtil.filterProgPath(this.src);
        // console.log('[%s.osrc] p1', TAG, src);

        if (/^data:/.test(src)) {
            return src;
        }

        if (/^http(s)?:\/\//.test(src)) {
            return src;
        }

        if (/^\/common\//.test(src) || /^\/f\//.test(src)) {
            return String(EnvUtil.MEDIA_BASE).replace(/\/$/, '') + src;
        }

        return ((this.baseFull || '') + src);
    }

    public get oalt(): string {
        return this.alt;
    }

    public get otitle(): string {
        return this.title;
    }

    public get osrcset(): string {
        return [
            [SImgUtil.src(this.src), '1x'].join(' '),
            [SImgUtil.src($v.p(this, 'x2', this.src)), '2x'].join(' '),
        ].join(',');
    }

    public get isSrcsetAuto() {
        return this.srcset === 'auto';
    }

    public get imgInfo(): any {
        return cSImgModule.imgImfos.findByKey('path', this.src.replace(/\/common\/img/, ''));
    }

    public get width(): number | null {
        return $v.p(this.imgInfo, 'img.width') / 2;
    }

    public get height(): number | null {
        return $v.p(this.imgInfo, 'img.height') / 2;
    }

    public get styleSize(): any {

        if (!this.width || !this.height) {
            return;
        }

        if (this.size) {
            return {
                width: `${(this.width / 20)}rem`,
                height: `${(this.height / 20)}rem`,
            };
        } else {
            return;
        }
    }

    /*
	    LOADED
    */
    public onLoad(ev: any) {
        this.isLoading = false;
        this.$emit('load', ev);
    }
}
