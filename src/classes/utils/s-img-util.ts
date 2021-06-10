import {Env} from "@/classes/app/env";
import VarUtil, {$v} from "~/classes/utils/var-util";
import CryptoJS from "crypto-js";

/**
 * SImg Ver 2.0
 *
 */
export default class SImgUtil {

    public static mediaBase: string;

    public static md5(string: string) {
        return CryptoJS.MD5(string).toString();
    }

    public static hash(string: string) {
        return self.md5(string);
    }

    public static filterProgPath(path: string): string {
        const p = path.split('/');
        const nl = p[p.length - 1];
        p.pop();
        p.push('__' + nl);
        return p.join('/');
    }

    public static cid(src: string): string {
        return self.md5(src);
    }

    public static src2Thumb(src: string): string {
        /\.([a-zA-Z]+)$/.test(src);
        const ext = RegExp.$1;
        return !!ext ? src.replace(/\.([a-zA-Z]+)$/, `_s\.${ext}`) : src;
    }

    public static thumb2Src(src: string): string {
        return src.replace(/_s\./, '.');
    }

    public static src(src: string): string {
        if (/^http(s)?\/\//.test(src)) {
            return src;
        } else {
            return $v.p(self, 'mediaBase', Env.MEDIA_BASE.replace(/\/+$/, ''))
                + src;
        }
    }

    public static makeSrcSet(src: string, pX2: string = ''): string {
        const ext = VarUtil.tap(/(\.[a-z]+)$/.test(src), (_: boolean) => {
            return RegExp.$1;
        });

        const sets = [`${src} 1x`];
        sets.push((!!pX2 ? pX2 : src.replace(/(\.[a-z]+)$/, '_2x' + ext)) + ' 2x');

        // console.log('***', this.osrc, ext, sets, RegExp.$1);

        return sets.join(',');
    }
}

const self = SImgUtil;
