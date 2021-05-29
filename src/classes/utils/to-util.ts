import {sprintf} from "sprintf-js";
import TxtUtil from "@/classes/view/txt-util";
import {Locale} from "~/configs/master-const";
import {appModule} from "~/store/app";
import {$v} from "~/classes/utils/var-util";

export class ToUtil {
    /**
     *
     * @param str
     */
    public static langTag(str: string): string {

        let words = [];
        let reg = /[\x20-\x7E]/;
        let now = null;
        let last = null;
        let tmp = '';

        for (let i = 0; i < str.length; i++) {
            now = reg.test(str[i]);

            // console.log(': ', i, str[i], now, last);
            if (now != last) {
                if (last == true) {
                    tmp = sprintf('<span class="en %s">%s</span>', TxtUtil.detectCase(tmp), tmp);
                }
                if (tmp !== '') {
                    words.push(tmp);
                }
                tmp = str[i];
            } else {
                tmp += str[i];
            }

            if ((i + 1) === str.length) {
                words.push(now ? sprintf('<span class="en %s">%s</span>', TxtUtil.detectCase(tmp), tmp) : tmp);
            }

            last = now;
        }
        // console.log('words: ', words);

        return words.join('');
    }

    public static langPath(langs: any[], name: string | null = null, lang: string | Locale | null = null): any {
        const _lang = (lang || appModule.lang).toString();
        const l = langs.findByKey('lang', _lang);
        return !name ? l : $v.p(l, name);
    }
}
