import {$v} from "~/classes/utils/var-util";
import {AppMode, Locale, MasterConst} from "~/configs/master-const";

declare var process: any;

export class EnvUtil {

    private static _inited: boolean = false;
    private static _vars: any = {};
    public static src: any = {};

    public static init() {

        if (M._inited) {
            return;
        }

        M._vars = {
            APP_MODE: process.env.APP_MODE || 'production',
            API_MODE: process.env.API_MODE || 'axios',
            APP_TYPE: process.env.APP_TYPE || '',
            MEDIA_BASE: process.env.MEDIA_BASE || '',
            BASE_URL: process.env.BASE_URL || '',
            API_BASE_URL: process.env.API_BASE_URL || '',
            API_POSTCODE_URL: process.env.API_POSTCODE_URL || '',
            OFFICIAL_URL: process.env.OFFICIAL_URL || '',
            GA_OFFICIAL: process.env.GA_OFFICIAL || '',
            LANG: process.env.LANG || Locale.En,

            TO985_API_BASE: process.env.TO985_API_BASE || '',
            TO985_SITE_CD: process.env.TO985_SITE_CD || '',
            TO985_SECRET: process.env.TO985_SECRET || '',

            INSTAGRAM_API_BASE: process.env.INSTAGRAM_API_BASE || '',
        };

        M._inited = true;
    }

    public static val(vname: any): any {
        M.init();
        return $v.p(M._vars, vname);
    }

    public static get vars(): any {
        return M._vars;
    }

    public static get APP_MODE(): string {
        const eMode = M.val('APP_MODE') as string;
        const aMode = MasterConst.App.Mode.find((_: AppMode) => (_.toString() === eMode));
        return !!aMode ? aMode.toString() : AppMode.Develop;
    }

    public static get API_MODE(): string {
        return M.val('API_MODE') as string;
    }

    public static get APP_TYPE(): string {
        return M.val('APP_TYPE') as string;
    }

    public static get LANG(): Locale {
        return M.val('LANG') as Locale;
    }

    public static get BASE_URL(): string {
        return M.val('BASE_URL') as string;
    }

    public static get OFFICIAL_URL(): string {
        return M.val('OFFICIAL_URL') as string;
    }

    public static get OFFICIAL_DOMAIN(): string {
        return M.OFFICIAL_URL
            .replace(/http[s]?:\/\//, '')
            .replace(/\/.+$/, '');
    }

    public static get API_BASE_URL(): string {
        return M.val('API_BASE_URL') as string;
    }

    // API_POSTCODE_URL
    public static get API_POSTCODE_URL(): string {
        return M.val('API_POSTCODE_URL') as string;
    }

    public static get MEDIA_BASE(): string {
        return (M.val('MEDIA_BASE') as string) || '';
    }

    public static get MAIL_MEDIA_BASE(): string {
        return (M.val('MAIL_MEDIA_BASE') as string) || '';
    }

    public static get GOOGLE_RECAPTCHA_SITE_KEY(): string {
        return M.val('GOOGLE_RECAPTCHA_SITE_KEY') as string;
    }

    public static get STRIPE_PUB_KEY(): string {
        return M.val('STRIPE_PUB_KEY') as string;
    }

    public static get GA_WAIT(): string {
        return M.val('GA_WAIT') as string;
    }

    public static get GA_OFFICIAL(): string {
        return M.val('GA_OFFICIAL') as string;
    }

    public static get TO985_API_BASE(): string {
        return M.val('TO985_API_BASE') as string;
    }

    public static get TO985_SITE_CD(): string {
        return M.val('TO985_SITE_CD') as string;
    }

    public static get TO985_SECRET(): string {
        return $v.p(M.src, 'to985Secret') as string;
    }


    public static get INSTAGRAM_API_BASE(): string {
        return M.val('INSTAGRAM_API_BASE') as string;
    }

    public static get INSTAGRAM_BUSINESS_ID(): string {
        return $v.p(M.src, 'instagramBusinessId') as string;
    }

    public static get INSTAGRAM_ACCESS_TOKEN(): string {
        return $v.p(M.src, 'instagramAccessToken') as string;
    }

    public static get INSTAGRAM_FIELDS(): string {
        return $v.p(M.src, 'instagramFields') as string;
    }

    public static url(url: string): string {
        return M.BASE_URL + url;
    }
}

const M = EnvUtil;
