import {Locale} from "~/configs/master-const";
import {$v} from "~/classes/utils/var-util";

const TAG = 'VueSsrHelper';

export class VueSsrHelper {
    public static detectLang(ctx: any, acceptLang: Locale[] = []): string {

        const acceptsLanguages = $v.p(ctx, 'req.headers.accepts-languages');
        console.log('[%s] UA Lang is LANG=', TAG, acceptsLanguages);

        return 'ja';
    }
}
