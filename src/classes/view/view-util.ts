import {Moment} from "moment";

export default class ViewUtil {

    public static styleTimeSeparator(now: Moment | null = null): any {
        return {
            visibility: (!!now && now.second() % 2 === 0) ? 'visible' : 'hidden',
        };
    }

    /*
      Number to Words
    */
    public static toWords(value: number): any {

        const th = ['', 'thousand', 'million', 'billion', 'trillion'];
        const dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        const tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        const tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

        let s: any = value;

        s = s.toString();
        s = s.replace(/[\, ]/g, '');
        if (s != parseFloat(s)) return 'not a number';
        let x: any = s.indexOf('.');
        if (x == -1) x = s.length;
        if (x > 15) return 'too big';
        let n: any = s.split('');
        let str: any = '';
        let sk: any = 0;
        for (let i: number = 0; i < x; i++) {
            if ((x - i) % 3 == 2) {
                if (n[i] == '1') {
                    str += tn[Number(n[i + 1])] + ' ';
                    i++;
                    sk = 1;
                } else if (n[i] != 0) {
                    str += tw[n[i] - 2] + ' ';
                    sk = 1;
                }
            } else if (n[i] != 0) { // 0235
                str += dg[n[i]] + ' ';
                if ((x - i) % 3 == 0) str += 'hundred ';
                sk = 1;
            }
            if ((x - i) % 3 == 1) {
                if (sk) str += th[(x - i - 1) / 3] + ' ';
                sk = 0;
            }
        }
        if (x != s.length) {
            const y: any = s.length;
            str += 'point ';
            for (let i: number = x + 1; i < y; i++) str += dg[n[i]] + ' ';
        }
        return str.replace(/\s+/g, ' ');
    }

    /**
     * 改行をBRへ返還
     * @param str
     */
    public static nl2br(str: string): string {
        return str.replace(/\n\r/g, '\n')
            .replace(/\n/g, '<br/>');
    }

    /**
     * 半角英数を<span class="en">*</span>で囲う
     * @param str
     */
    public static filterEn(str: string): string {

        if (!str || typeof (str.replace) != 'function') {
            return '';
        }

        const preg_replace = (reg: RegExp, rep: string, target: string): string => {
            return target.replace(reg, rep);
        };

        const trim = (target: string): string => {
            return target.replace(/^[ \t　]+/, '')
                .replace(/[ \t　]+$/, '');
        };

        const mb_strlen = (target: string): number => {
            return target.length;
        };

        const mb_substr = (target: string, offset: number = 0, length: number | null = null): string => {
            return target.substr(offset, length || target.length);
        };

        const mb_detect_encoding = (c: string): string => {
            return c.match(/^[\x20-\x7e]*$/) ? 'ASCII' : '';
        };

        const in_array = (needle: any, arr: string[]): boolean => {
            return (arr.indexOf(needle) >= 0);
        };

        let pstr = trim(str);
        pstr = preg_replace(/\r\n/, '\n', pstr);
        let len = mb_strlen(pstr);
        let open = false;
        let tag = false;
        let r = '';
        let reject = [' '];

        for (let i = 0; i < len; i++) {
            let c = mb_substr(pstr, i, 1);
            let cc = (mb_detect_encoding(c) == 'ASCII');

            if (c == '<' && !tag) {
                if (open) {
                    open = false;
                    c = '</span>' + c;
                }
                tag = true;
            }

            if (!tag && !in_array(c, reject)) {
                if (c == '\n' && open) {
                    open = false;
                    c = '</span>' + c;
                } else if (c != '\n' && cc) {
                    if (!open) {
                        open = true;
                        // @ts-ignore
                        c = '<span class="en">' + c;
                    }
                } else if (open) {
                    open = false;
                    c = '</span>' + c;
                }
            }

            if (c == '>' && tag) {
                tag = false;
            }

            r += c;
        }

        if (open) {
            r += '</span>';
        }

        return r;
    }
}
