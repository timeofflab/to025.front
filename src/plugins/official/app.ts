import Vue from 'vue';
import {LANG_OFFICIAL} from "~/configs/lang/official";
import {LangLabelUtil} from "~/classes/domain/lang/lang-label-util";
import OLoaderFrame from "~/components/pages/official/OLoaderFrame.vue";

LangLabelUtil.src = LANG_OFFICIAL;
Vue.component('OLoaderFrame', OLoaderFrame);