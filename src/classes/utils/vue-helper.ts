import {$v} from "~/classes/utils/var-util";
import {appModule} from "~/store/app";
import {$d} from "~/classes/utils/date-util";
import WindowUtil from "~/classes/utils/window-util";
import WUtil from "~/classes/view/w-util";

const TAG = 'VueHelper';

export class VueHelper {

    /**
     *
     */
    public static async splash(cb: () => void) {

        if (!WUtil.isBrowser) {
            return false;
        }

        //Force Resize Event
        WindowUtil.resizeWindow();

        await appModule.loadLs();
        console.log('[%s] splash', TAG, appModule.splash);

        window.setTimeout(() => {
            //Force Resize Event
            WindowUtil.resizeWindow();

            cb();

        }, VueHelper.isShowSplash() ? 5000 : 3000);

        appModule.updateSplash($d.datetimeFormat());
    }

    public static isShowSplash(): boolean {
        const splash = appModule.splash;
        if ($v.isEmpty(splash)) {
            console.log('[%s] splash is empty', TAG, splash);
            return true;
        }

        const lastViewedAt = $d.datetime(splash);
        const limitedAt = $d.datetime().add(-60, 'minutes');
        // const limitedAt = $d.datetime().add(-60, 'minutes');

        console.log('[%s] limitedAt=%s, lastViewedAt=%s, > isAfter=%s', TAG,
            limitedAt.format(),
            lastViewedAt.format(),
            limitedAt.isAfter(lastViewedAt) ? 'AT' : 'BF');

        return limitedAt.isAfter(lastViewedAt);
    }

    public static showSplash() {
        appModule.updateSplash($d.datetimeFormatTz());
    }

    public static param(vue: any, param: string, init: any = null): any {
        return $v.p(vue, `$route.params.${param}`) || init;
    }
}

export const $vh = VueHelper;
