import {$v} from "~/classes/utils/var-util";
import {Locale, MasterConst} from "~/configs/master-const";
import {LangLabelUtil} from "~/classes/domain/lang/lang-label-util";
import WUtil from "~/classes/view/w-util";

export class UrlUtil {

    public static getUserAgent(ctx: any): string {
        if (WUtil.isBrowser) {
            return String(navigator.language).replace(/-.+$/, '');
        } else {
            return $v.p(ctx, 'req.headers.accept-language');
        }
    }

    public static async langLocationS(ctx: any): Promise<any> {

        const url = $v.p(ctx, 'route.path');
        console.log('locationS > ', WUtil.isBrowser, url);

        if (UrlUtil.isActiveUrl(url)) {
            return null;
        }

        const acceptLang = $v.tap(self.getUserAgent(ctx), (al: string | null) => {

            const segs = String(al).split(',')[0]
            return !segs
            || (!!segs && segs.length === 0)
            || !$v.isString(al)
            || $v.isEmpty(al)
                ? MasterConst.App.LangDefault : $v.tap(segs[0], (lang: string) => {
                    let r = false;
                    MasterConst.App.Lang.some((_: Locale) => {
                        return r = (_.toString() === lang);
                    });
                    return r ? lang : MasterConst.App.LangDefault;
                });
        });

        const acceptUrl = `/${acceptLang}`;
        const reg = new RegExp(`^${acceptUrl}[/]?`);

        console.log('acceptUrl is url=%s / acceptUrl=%s', url, acceptUrl);
        if (url === '/' || url === false) {
            return $v.p(ctx, 'redirect')(acceptUrl);
        } else if (!reg.test(url) && !UrlUtil.isNoLangPath(url)) {
            return $v.p(ctx, 'redirect')('/error/e404');
        } else {
            return null;
        }
    }

    public static async langLocation(vue: any) {
        const path = $v.p(vue.$route, 'path');
        console.log('created() > ', path, self.isActiveUrl(path) ? 'T' : 'F');

        if (!path) {
            throw Error('path error');
        }

        if (!self.isActiveUrl(path)) {
            const rpath = self.reasonablePath(path || '');
            console.log('reasonablePath >', rpath);
            if (!$v.isEmpty(rpath)) {
                console.log('*******', vue.$router);
            }
            window.location.href = rpath;
            // await vue.$router.push(rpath);
            return false;
        } else {
            return true;
        }
    }

    /**
     * 開発URL検出
     * @param path
     */
    public static isDevPath(path: string): boolean {

        let r = false;
        MasterConst.App.DevelopPath.some((_: RegExp) => {
            if (_.test(path)) {
                return r = true;
            }
        });

        return r;
    }

    /**
     * 開発URL検出
     * @param path
     */
    public static isNoLangPath(path: string): boolean {

        let r = false;
        MasterConst.App.NoLangPath.some((_: RegExp) => {
            if (_.test(path)) {
                return r = true;
            }
        });

        return r;
    }

    /**
     * 対象言語の自動検出
     * @param pathLang
     * @param browserLang
     * @param lang
     * @param defaultLang
     */
    public static detectTargetLangUrl(pathLang: string,
                                      browserLang: string = self.browserLanguage,
                                      lang: object = LangLabelUtil.src,
                                      defaultLang: string = 'ja'): string {

        return $v.p(lang, pathLang)
            || $v.p(lang, browserLang)
    }

    public static isActiveUrl(path: string): boolean {

        let r = false;

        if (self.isDevPath(path)) {
            return true;
        }

        if (self.isNoLangPath(path)) {
            return true;
        }

        MasterConst.App.Lang.some((_: Locale) => {
            const regS = new RegExp(`^/${_.toString()}$`);
            const reg = new RegExp(`^/${_.toString()}/`);
            if (reg.test(path) || regS.test(path)) {
                return r = true;
            }
        });

        return r;
    }

    /**
     *
     * @param path
     */
    public static reasonablePath(path: string): string {
        const lang = self.browserLanguage;
        const alang = MasterConst.App.Lang.find((_: Locale) => _.toString() === lang);
        const plang = !!alang ? alang.toString() : MasterConst.App.LangDefault;

        return `/${plang}${path}`;
    }

    public static detectLangByPath(path: string) {

        const segs = path.replace(/^\//, '').split('/');
        const lang = segs.length > 0 ? segs[0] : self.browserLanguage;

        return ($v.p(LangLabelUtil.src, `${lang}.pages.index`) !== null) ? lang
            : MasterConst.App.LangDefault;
    }

    public static get browserLanguage(): string {
        const lang = navigator.language;
        return !!lang ? lang.toLowerCase()
            .replace(/[-_][a-zA-z]+$/, '') : '';
    }

}

const self = UrlUtil;
