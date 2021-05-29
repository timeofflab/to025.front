import {$v} from "~/classes/utils/var-util";
import {to985Module} from "~/store/to985";
import {AppModeUtil} from "~/classes/app/app-mode-util";
import {EnvUtil} from "~/classes/utils/env-util";
import {cRecaptchaV3Module} from "~/store/c/recaptcha-v3";
import {debugModule} from "~/store/debug";

const TAG = 'To985Util';

/**
 *
 */
export class To985Util {

    /**
     *
     */
    public static initClient(src: any = null) {
        console.log('%s.initClient｜src', TAG, src);
        if (!!src) {
            self.setup(src);
        } else {
            self.initByMeta();
        }
    }

    public static initByDevelop() {
        to985Module.updateToken(to985Module.token);
    }

    public static initByMeta() {

        if (!$v.isEmpty(to985Module.token)) {
            return;
        }

        const elm = (document as any).getElementById('to985_token');
        console.log('%s.mounted | elm=', TAG, elm);
        if (!!elm) {
            const content = elm.getAttribute('content');
            try {
                const obj = self.parseJson(content);
                self.setup(obj);
            } catch (e) {
            }
            console.log(' - content = ', TAG, content);
        } else {
            console.log(' - no content', TAG);
        }
    }

    public static parseJson(json: string): string {
        try {
            return JSON.parse(json);

        } catch (e) {
            return '';
        }
    }

    public static setup(src: any) {
        to985Module.updateDebug(!!$v.p(src, 'debug', 0));
        to985Module.updateToken($v.p(src, 'token', ''));
        to985Module.updateRecaptchaV3SiteKey($v.p(src, 'recaptchaV3SiteKey', ''));
        cRecaptchaV3Module.updateSiteKey($v.p(src, 'recaptchaV3SiteKey', ''));

    }
}

const self = To985Util;
