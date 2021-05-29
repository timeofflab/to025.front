import {MasterConst} from "~/configs/master-const";

export class PasswordCharValidator {
    /**
     * ・半角英小文字
     * ・半角英大文字
     * ・半角数字
     * ・半角記号 (OPTIONAL)
     * @param value
     * @param withMark
     */
    public static validChar(value: string, withMark: boolean = true): boolean {

        const r = [];

        if (!/[a-z]/.test(value)) {
            r.push(1);
        }
        if (!/[A-Z]/.test(value)) {
            r.push(2);
        }
        if (!/[0-9]/.test(value)) {
            r.push(3);
        }
        if (withMark && !MasterConst.Form.Basic.Password.Rule.test(value)) {
            r.push(4);
        }

        // console.log('R =', value, r.length, r);

        return r.length === 0;
    }

    /**
     * [length(6)]種類以上の文字が使われているかチェック
     *
     * @param value
     * @param typeNum
     */
    public static validCharType(value: string,
                                typeNum: number = MasterConst.Form.Basic.Password.CharType): boolean {

        const ct = [];

        for (let i = 0; i < value.length; i++) {
            const c = value.substr(i, 1);
            if (ct.indexOf(c) < 0) {
                ct.push(c);
            }
        }

        return (ct.length >= typeNum)
    }
}
