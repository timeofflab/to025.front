import {AppMode, Locale} from "@/configs/master-const";
import {$v} from "@/classes/utils/var-util";
import {vsprintf} from "sprintf-js";
import {EnvUtil} from "~/classes/utils/env-util";
import {appModule} from "~/store/app";

export class LangLabelUtil {

    public static src: any = {};

    /**
     *
     */
    public static lang: Locale = EnvUtil.LANG;


    /**
     * 状態で出自が違う
     * Browser -> location.hostname
     * SSR -> ctx.headers.host
     */
    public static detectHostByHost(host: string): Locale {
        if (EnvUtil.APP_MODE === AppMode.Production) {
            if (['ja.paradeartist.com', 'ja.w3.paradeartist.com'].indexOf(host) >= 0) {
                console.log('ja host');
                return Locale.Ja;
            } else {
                console.log('en host');
                return Locale.Ja;
            }
        } else {
            console.log('mode is', EnvUtil.APP_MODE);
            return Locale.Ja;
            // ereturn EnvUtil.LANG;
        }
    }

    /**
     * @param lang
     */
    public static isAcceptLang(lang: string): boolean {
        return !!$v.p(LangLabelUtil.src, lang);
    }

    public static ah(url: string, base: string = '', lang: string | null = null): string {
        return `${base}/${lang || LangLabelUtil.lang}${url}`;
    }

    /**
     * KeyからLabelを取得
     * @param key
     * @param def
     * @param param
     */
    public static _(key: string, def: string = '', param: any[] = []): string {

        return self.loc(appModule.lang, key, def, param);
    }

    /**
     * 言語を指定してKeyからLabelを取得
     * @param locale
     * @param key
     * @param def
     * @param param
     */
    public static loc(locale: Locale = Locale.Ja, key: string, def: string = '', param: any[] = []): string {

        const path = `${locale}.${key}`;
        const buff = $v.p(self.src, path, param);
        if (!!buff && $v.isString(buff)) {
            return $v.tap(buff.trim(), (_: string) => {
                return (param.length > 0) ? vsprintf(_, param) : _;
            });
        } else {
            return def;
        }
    }
}

const self = LangLabelUtil;

export const _ = LangLabelUtil._;
