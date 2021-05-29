import Vuex from 'vuex';
import {$v} from "~/classes/utils/var-util";
import {Locale} from "~/configs/master-const";
import {EnvUtil} from "~/classes/utils/env-util";
import {LangLabelUtil} from "~/classes/domain/lang/lang-label-util";
import {appModule} from "~/store/app";
import {IInstagramMediaResponse} from "~/store/c/instagram";

const TAG = 'store';

export const state = () => {
    return {
        to985: {
            token: '',
            recaptchaV3SiteKey: '',
        },
        instagram: null as IInstagramMediaResponse | null,
    };
};

export const mutations = {
    updateTo985(state: any, value: any) {
        state.to985 = value;
    },

    updateInstagram(state: any, value: IInstagramMediaResponse | null = null) {
        state.instagram = value;
    },
};

/**
 * nuxtServerInitが
 * vuex-module-decoratorでフォローされていないので
 * store/index.tsは特殊扱いとする（SSR用）
 * あまり意味はなく、自動で呼び出されるという点だけが特徴
 * SSRストアからクライアントストアに直接値は引き継げない（各PのasyncDataが必要）
 * 独自のstatic処理と変わらない
 * コンポーネントのfetch()(SSR)で上記のstateを引き継げる模様
 */
export const actions = {
    nuxtServerInit: (ctx: any, svr: any) => {
        // console.log('[%s] ctx is ', TAG, Object.keys(ctx));
        // console.log('svr is ', TAG, Object.keys(svr));
        // console.log('svr.req is ', TAG, svr.req);
        // console.log('svr.req.url is ', TAG, svr.req.url);

        const host = $v.p(svr, 'req.headers.host');
        const path = $v.p(svr, 'req.url');
        const alang = 'ja';
        // const alang = $v.tap($v.p(svr, 'req.headers.accept-language'), (al: string) => {
        //     return String(al).split(',')[0];
        // });

        console.log('host is > ', host);
        console.log('?l= > ', $v.p(svr, 'route.query.l'));

        const baseLang = LangLabelUtil.detectHostByHost(host);

        LangLabelUtil.lang = $v.tap(null, () => {
            const pl = $v.p(svr, 'route.query.l') as Locale | null;
            if ($v.isEmpty(pl)) {
                console.log('baseLang is ', baseLang);
                return baseLang as Locale;
            } else {
                return pl as Locale;
            }
        });
        appModule.updateLang(LangLabelUtil.lang);
        console.log('lang is > ', EnvUtil.LANG, LangLabelUtil.lang);
        // console.log('host is ', host);
        // console.log('path is ', path);
        // server context
        // console.log('svr', svr);
        // console.log('alang, inLocale', alang, inLocale);
    }
}

