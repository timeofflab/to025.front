import {Vue, Component, Prop} from 'vue-property-decorator';
import {Watch} from "nuxt-property-decorator";
import {EnvUtil} from "~/classes/utils/env-util";
import SImgUtil from "~/classes/utils/s-img-util";
import {cSImgModule, ICSImg} from "~/store/c/s-img";
import {$v} from "~/classes/utils/var-util";
import WUtil from "~/classes/view/w-util";

const TAG = 'SImg';

/**
 * SImg Ver 2.0
 * <s-img
 *  // ソース(/common/imgが自動でつく)
 *      src="/manager/aaa/bbb.jpg"
 *  // Alt
 *      alt=""
 *  // Title
 *      title=""
 *  // srcset
 *      srcset="auto" ... 自動計算
 *      srcset="no|false" ... srcset無し
 *      srcset="直指定" ... 直接指定
 *  />
 **/
@Component
export default class SImg extends Vue {

    @Prop({default: '@'})
    public host: string;

    @Prop({default: '/common/img'})
    public base: string;

    @Prop({default: ''})
    public src: string;

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

    @Prop({default: 'off'})
    public progressive: string;


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
        return SImgUtil.hash(this.osrc);
    }

    public get isProgressive(): boolean {
        return $v.isEmpty(this.progressive)
            || this.progressive.toLowerCase() === 'on';
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

        if (!this.isProgressive) {
            return this.osrc;
        } else if (!this.sImg) {
            // console.log('[%s.imgSrc] > a', TAG);
            return SImgUtil.thumb2Src(this.osrc);
        }

        // console.log('[%s.imgSrc] > b', TAG);
        return $v.p(this.sImg, 'main.src', '');
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

        if (this.isBlankSrcset) {
            return '';
        }

        return !this.isSrcsetAuto ?
            String(this.srcset) : SImgUtil.makeSrcSet(this.imgSrc);

    }

    public get oThumbSrcSet(): string {

        const src = this.imgThumbSrc;

        if (this.isBlankSrcset) {
            return '';
        }

        return !this.isSrcsetAuto ?
            String(this.srcset) : SImgUtil.makeSrcSet(this.imgThumbSrc);
    }

    public get isSrcsetOfString(): boolean {
        return this.srcset.hasOwnProperty('length');
    }

    /**
     * srcsetを空で返すか
     */
    public get isBlankSrcset(): boolean {

        // srcsetがBlank
        if (this.srcset === false) {
            return true;
        }

        // svgファイルも不要
        if (/\.svg(\?.+)*$/.test(this.osrc)) {
            return true;
        }

        //テキスト且つ no または falseの場合も空
        if (this.isSrcsetOfString
            && ['no', 'false'].indexOf((this.srcset as string).toLowerCase()) >= 0) {
            return true;
        }

        return false;
    }

    public get isSrcsetAuto() {
        return !this.isBlankSrcset && this.srcset === 'auto';
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
