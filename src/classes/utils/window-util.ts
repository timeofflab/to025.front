import $ from 'jquery';
import {IViewSize} from "~/classes/core/i";
import {appModule} from "~/store/app";
import UseragentUtil from "~/classes/view/useragent-util";
import {scrollModule} from "~/store/scroll";
import {$v} from "~/classes/utils/var-util";

const TAG = 'WindowUtil';

export default class WindowUtil {

    public static detectWindowSize(): IViewSize {
        return {
            width: Number($(window).width()),
            height: Number($(window).height()),
        };
    }

    public static get location(): string {
        return window.location.pathname;
    }

    public static scrollTop(cid: string = '@'): number {
        const s = scrollModule.scrolls.findByKey('id', cid);
        return !!s ? s.scrollTop : 0;
    }

    public static initDevice() {
        appModule.updateDeviceOs(UseragentUtil.os());
        appModule.updateDeviceDevice(UseragentUtil.device());
    }

    public static resizeWindow() {
        let w: number = 0;
        let h: number = 0;

        if (!$(window).innerWidth() || !$(window).innerHeight()) {
            return;
        }

        w = Number($(window).innerWidth());
        h = Number($(window).innerHeight());

        appModule.updateWindowSize({
            width: w,
            height: h,
        });
        self.updateScreenSize();

        appModule.updateDeviceSize(UseragentUtil.size(w));

        // 最初に、ビューポートの高さを取得し、0.01を掛けて1%の値を算出して、vh単位の値を取得
        let vh = h * 0.01;

        // カスタム変数--vhの値をドキュメントのルートに設定
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    public static updateScreenSize() {
        appModule.updateScreenSize({
            width: window.parent.screen.width,
            height: window.parent.screen.height,
        });
    }

    public static scrollToTop(vRef: any, to: number = 0) {

        const os = (!!vRef) ? vRef.osInstance() : null;
        if (!os) {
            return;
        }
        os.scroll(to);

        setTimeout(() => {
            os.update(true);
        }, 300);
    }

    public static scrollTo(cid: string = '@', el: HTMLElement | number | null = -1) {

        console.log('[%s.scrollTo] el=', TAG, el);
        scrollModule.updateScroll({
            id: cid,
            scrollTop: (!!el && el instanceof HTMLElement) ? self.getYPos(el) : (el || 0),
        });
        console.log('[%s.scrollTo] p2 > ', TAG, scrollModule.scrolls.findByKey('id', cid));
    }

    public static getPos(el: HTMLElement): any {

        let elParents: any = el;
        let i: number = 0;
        let id: string = '';

        let offsetY = 0;
        let offsetX = 0;

        if (offsetY == undefined || offsetY == null) {
            console.log('getPos return');
            return {top: 0, left: 0};
        }

        offsetY += elParents.offsetTop;
        offsetX += elParents.offsetLeft;

        for (let i = 0; i < 30; i++) {

            if (id == '__layout') {
                break;
            }

            // position: relative の時のみ座標を取得
            const parentNode = $v.p(elParents, 'parentNode') as HTMLElement | null;
            if (!parentNode) {
                break;
            }

            const style = window.getComputedStyle(parentNode!);
            const stylePosition = style.getPropertyValue('position');

            if (stylePosition == 'absolute' || stylePosition == 'relative') {
                let t = elParents.parentNode.offsetTop;
                let l = elParents.parentNode.offsetLeft;

                if (t == undefined || t == null) {
                    break;
                }

                offsetY += window.pageYOffset + t;
                offsetX += window.pageXOffset + l;
            }

            elParents = elParents.parentNode as HTMLElement;

            if (elParents.id) {
                id = elParents.id;
            }
        }

        console.log();

        return {
            top: offsetY,
            left: offsetX
        };
    }

    public static getYPos(el: HTMLElement): number {
        return self.getXYPos(el, 'y');
    }

    public static getXPos(el: HTMLElement): number {
        return self.getXYPos(el, 'x');
    }

    public static getXYPos(el: HTMLElement, direction: 'y' | 'x'): number {

        let y: number = 0;
        let elParents: any = el;
        let id: string = '';
        const offset = direction === 'y' ? 'offsetTop' : 'offsetLeft';
        const wOffset = direction === 'y' ? 'pageYOffset' : 'pageXOffset';

        y += Number($v.p(elParents, offset));
        if (Number.isNaN(y)) {
            console.log('getXYPos return > ', direction);
            return 0;
        }

        for (let i = 0; i < 30; i++) {

            if (id == '__layout') {
                break;
            }

            // position: relative の時のみ座標を取得
            const parentNode = $v.p(elParents, 'parentNode') as HTMLElement | null;
            if (!parentNode) {
                break;
            }

            const style = window.getComputedStyle(parentNode!);
            const stylePosition = style.getPropertyValue('position');

            if (stylePosition == 'absolute' || stylePosition == 'relative') {
                let o = Number($v.p(elParents, `parentNode.${offset}`)); // elParents.parentNode.offsetTop;
                if (Number.isNaN(o)) {
                    break;
                }

                y += Number($v.p(window, wOffset)) + o;
            }

            elParents = elParents.parentNode as HTMLElement;

            if (elParents.id) {
                id = elParents.id;
            }
        }

        return y;
    }
}

const self = WindowUtil;
