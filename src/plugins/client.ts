import Vue from 'vue';
import resize from 'vue-resize-directive';
import WindowUtil from "~/classes/utils/window-util";
import Throttle from "~/classes/core/throttle";
import {bodyModule} from "~/store/body";
import Bubble from "~/components/ui/Bubble";
import {SsrBridgeUtil} from "~/classes/app/ssr-bridge-util";

Vue.directive('resize', resize);
Vue.component('bubble', Bubble);

const resizeThrottle = new Throttle(300);
const bodyClickThrottle = new Throttle(100);

document.addEventListener('click', () => {
    bodyClickThrottle.throttle(() => {
        bodyModule.incBodyClickEventSeq();
    });
});

window.addEventListener('resize', () => {
    resizeThrottle.debounce(() => {
        console.log('[window.#resize] onResize');
        WindowUtil.resizeWindow();
    });
});
window.addEventListener('load', () => {
    console.log('[window.#Load] onLoad');
    WindowUtil.initDevice();
});

SsrBridgeUtil.init();
