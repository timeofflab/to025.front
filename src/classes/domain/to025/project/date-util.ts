import {$v} from "~/classes/utils/var-util";

const TAG = 'DateUtil';

/**
 *
 */
export class DateUtil {
    /**
     *
     * @param src
     */
    public static validFormat(src: string): boolean {
        const n = src.replace(/\/-\./g, '')
        return /^[0-9]+/.test(n)
            && (n.length === 6 || n.length === 8);
    }

    /**
     *
     * @param src
     */
    public static validDate(src: string): boolean {

        const s = self.filterDate(String(src) || '-');

        if (!self.validFormat(s)) {
            return false;
        }

        const date = $v.datetime(s);

        const y = Number(s.substr(0, 4));
        const m = Number(s.substr(4, 2));
        const d = Number(s.substr(6, 2));

        console.log('', {
            s,
            y, m, d,
            dy: date.year(),
            dm: date.month(),
            dd: date.date(),
        });

        return (
            y === date.year()
            && m === (date.month() + 1)
            && d === date.date()
        );
    }

    public static filterDate(src: string): string {
        const r = src.replace(/[-\.\/,]/g, '');
        return /^[0-9]{6}$/.test(r)
            ? '20' + r : r;
    }
}

const self = DateUtil;
