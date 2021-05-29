import Vue from 'vue';
import {$v} from "~/classes/utils/var-util";
import Cmd from "~/components/Cmd";
import En from "~/components/foundation/En.vue";
import SImg from "~/components/foundation/SImg";
import SLoader from "~/components/foundation/part/SLoader";
import NoImg from "~/components/module/NoImg";
import Qr from "~/components/ui/Qr";
import Err from "~/components/ui/Err";
import LoadingFrame from "~/components/foundation/part/LoadingFrame.vue";
import TransitionWrapperDefault from "~/components/popups/TransitionWrapperDefault.vue";
import {OverlayScrollbarsComponent, OverlayScrollbarsPlugin} from 'overlayscrollbars-vue';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import AH from "~/components/ui/AH";
import FgInput from "~/components/ui/form/FgInput";
import FInput from "~/components/ui/form/FInput";
import FSelect from "~/components/ui/form/FSelect";
import FRadio from "~/components/ui/form/FRadio";
import FCheck from "~/components/ui/form/FCheck";
import FEdit from "~/components/ui/form/FEdit";
import PopupLayer from "~/components/popups/PopupLayer";
import MainFrame from "~/components/foundation/layout/MainFrame";
import OfficialMainFrame from "~/components/foundation/layout/OfficialMainFrame";
import Console from "~/components/pages/share/Console";
import Inview from "~/components/foundation/Inview";
import Navigation from '@/components/pages/official/Navigation.vue';
import OFooter from '@/components/pages/official/OFooter.vue';
import IconFb from '@/components/svg/IconFb.vue';
import IconInstagram from '@/components/svg/IconInstagram.vue';
import BtnArrow from '@/components/svg/BtnArrow.vue';
import {EnvUtil} from "~/classes/utils/env-util";
import {Api} from "~/classes/api";
import WUtil from "~/classes/view/w-util";

// console.log('plugins/boot - start');

Vue.use(OverlayScrollbarsPlugin);
Vue.component('overlay-scrollbars', OverlayScrollbarsComponent);

// CamelケースはPugで扱えない
Vue.component('ah', AH);
Vue.component('PopupLayer', PopupLayer);
Vue.component('loadingFrame', LoadingFrame);
Vue.component('cmd', Cmd);
Vue.component('en', En);
Vue.component('sImg', SImg);
Vue.component('sLoader', SLoader);
Vue.component('noImg', NoImg);
Vue.component('qr', Qr);
Vue.component('Err', Err);
Vue.component('FEdit', FEdit);
Vue.component('FgInput', FgInput);
Vue.component('FInput', FInput);
Vue.component('FSelect', FSelect);
Vue.component('FRadio', FRadio);
Vue.component('FCheck', FCheck);
Vue.component('transition-wrapper-default', TransitionWrapperDefault);
Vue.component('main-frame', MainFrame);
Vue.component('official-main-frame', OfficialMainFrame);
Vue.component('console', Console);
Vue.component('inview', Inview);
Vue.component('navigation', Navigation);
Vue.component('oFooter', OFooter);
Vue.component('iconFb', IconFb);
Vue.component('iconInstagram', IconInstagram);
Vue.component('btnArrow', BtnArrow);

$v.init();

// console.log('plugins/boot - end', Err);
export default function (context: any) {
    // console.log('plugins/boot | fn() ?? > ', process.env);
    console.log('plugins/boot | fn() API_BASE_URL > ', EnvUtil.API_BASE_URL);
    Api.axios = context.$axios;
    EnvUtil.src = context.app.$config;
}

