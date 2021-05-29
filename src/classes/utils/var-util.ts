import moment from 'moment-timezone';
import {sprintf} from "sprintf-js";

declare var window: any;

export enum CRUD {
    N = '',
    C = 'c',
    R = 'r',
    U = 'u',
    D = 'd',
}

/**
 * VarUtil($v)
 *
 * version: 2020.524.0
 * - 2020-05-24 - update - adaptInputのcheckbox対応
 * - 2020-03-16 - fix - replaceByKey > フラグ処理エラー（updateが無効だった）
 * - 2020-03-14 - fix - has() > bugfix,
 *              - fix - get() > 構成要素をパスでhasしていた
 *              - fix - isNumberの判定修正
 * - 2020-02-24(12) - fix - replaceBoKey
 * - 2020-02-23(11) - fix - ts
 * - 2020-02-19(9) - add put, isArray, fix hasOwnProperty
 * - 2020-02-18(4) - g18 | to004
 * - 2020-02-16 - first他を追加
 * - 2020-02-15 - replaceByKeyを追加
 *
 */
export default class VarUtil {

    public static debug: boolean = false;

    public static prod() {

        $v.debug = false;

        window!['console'] = {};
        window!['console'].log = (i: any) => {
            return;
        };
        window!['console'].time = (i: any) => {
            return;
        };
        window!['console'].timeEnd = (i: any) => {
            return;
        };
    }

    public static init() {

        // @ts-ignore
        Array.prototype!['findByKey'] = function (key: any, value: any) {
            return (this as any)['find']((_: any) => {
                return (_![key] === value);
            }) || null;
        };

        // @ts-ignore
        Array.prototype!['findIndexByKey'] = function (key: any, value: any) {

            let r = -1;
            const e = $v.isObject(value) ? $v.p(value, key) : value;
            (this as any)['some']((_: any, idx: number) => {

                if ($v.p(_, key) === value) {
                    r = idx;
                    return true;
                } else {
                    return false;
                }
            });

            return r;
        };

        // @ts-ignore
        Array.prototype!['replaceByKey'] = function (key: any, rep: any, add: boolean = true): {
            update: string, // '' | 'u' | 'a'
            array: any[],
        } {

            let update = '';
            let replaced = false;
            const array = this.map((_: any) => {
                if ((_![key] === rep![key])) {
                    update = 'u';
                    replaced = true;
                    return rep;
                } else {
                    return _;
                }
            });

            if (!replaced && add) {
                update = 'a';
                array.push(rep);
            }

            return {
                update,
                array,
            };
        };

        // @ts-ignore
        Array.prototype!['rejectByKey'] = function (key: any, value: any) {
            const e = $v.isObject(value) ? $v.p(value, key) : value;
            return (this as any)['filter']((_: any) => {
                return (_![key] !== e);
            }) || null;
        };

        // @ts-ignore
        Array.prototype!['first'] = function () {
            return this![0];
        };

        // @ts-ignore
        Array.prototype!['last'] = function () {
            return this![this.length - 1];
        };

        // @ts-ignore
        Array.prototype!['isLast'] = function (idx: number) {
            return (idx === this.length - 1);
        };

        // @ts-ignore
        Array.prototype!['isOver'] = function (idx: number) {
            return (idx < 0 || idx >= this.length);
        };

        // @ts-ignore
        Array.prototype!['from'] = function (concat: any = null) {
            return $v.tap(Array.from(this), (_: any) => {
                if (!!concat) {
                    return _.concat(Array.isArray(concat) ? concat : [concat]);
                } else {
                    return _;
                }
            });
        };
    }

    public static async wait(wait: number): Promise<unknown> {
        return new Promise((resolv, reject) => {
            setTimeout(() => resolv(), wait);
        });
    }

    public static export<T>(...objs: any[]): T {

        const r: any = {} as any;

        objs.map((_: any) => {

            for (const i of Object.keys(_)) {
                r[i] = _[i];
            }
        });

        return r;
    }

    public static v(val: any, def: any = ''): any {
        if (val === undefined) {
            return def;
        } else {
            return val;
        }
    }

    public static coru(v: any, pkey: string = 'id'): CRUD {
        return ($v.has(v, pkey) && $v.isEmpty($v.g(v, pkey))) ? CRUD.C : CRUD.U;
    }

    public static isEmpty(v: any): boolean {

        if ($v.isString(v) && v.length === 0) {
            return true;
        }

        return !v;
    }

    // 日付文字列の妥当性
    public static isDate(dt: string): boolean {

        if ($v.isEmpty(dt)) {
            return true;
        }

        dt = dt.replace(/[\/年月]/g, '-')
            .replace(/日/, '');

        // YYYY/MM/DD YYYY-MM-DD YYYY年MM月DD日
        if (!dt.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
            // console.log('no match', dt, dt.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/));
            return false;
        }

        // console.log('date is valid', dt);
        return $v.date(dt).isValid();
    }

    public static isString(val: any): boolean {
        return $v.isType(val, 'string');
    }

    public static isNumber(val: any): boolean {
        return $v.isType(val, 'number') && !isNaN(val);
    }

    public static isNull(v: any): boolean {
        return !$v.is(v);
    }

    public static is(v: any): boolean {
        return (v !== undefined && v !== null);
    }

    public static num(val: any, def: number = 0): number {
        return $v.numN(val, def)!;
    }

    public static numN(val: any, def: number | null = null): number | null {
        const n = Number(val);
        if ($v.isNumber(n)) {
            return n;
        } else {
            return def;
        }
    }

    public static boolN(bool: boolean, t: number = 1, f: number = 0): number {
        return bool ? t : f;
    }

    public static boolS(bool: boolean, t: string = 't', f: string = 'f'): string {
        return bool ? t : f;
    }

    public static bool(bool: any): boolean {

        if (Array.isArray(bool)) {
            return (bool.length > 0);
        }

        return (bool !== 0
            && bool !== '0'
            && !/false/i.test(bool)
            && bool !== false
            && bool !== null
            && bool !== undefined
        );
    }

    public static nbool(bool: number): boolean {
        return (bool !== 0);
    }

    public static sbool(bool: string): boolean {

        if (!$v.isString(bool)) {
            return false;
        }

        return (['t', 'true', 'on', 'ok'].indexOf(bool.toLowerCase()) >= 0);
    }

    public static sboolN(bool: string): number {
        return $v.sbool(bool) ? 1 : 0;
    }

    public static in(v: any, index: string): boolean {

        if (Array.isArray(v)) {
            return (v.indexOf(index) >= 0);
        }

        if (v === null || typeof (v) !== 'object') {
            return false;
        }

        return (index in v);
    }

    public static has(v: any, path: string | null = null): boolean {

        if (v === undefined || v === null) {
            return false;
        }

        if ($v.has(path)) {
            if (typeof v !== 'object') {

                return false;
            } else if (typeof path === 'string') {
                const n = path.split('.');

                if (!(n[0] in v)) {
                    return false;
                } else if (n.length === 1) {
                    return this.has(v[n[0]], null);
                } else {
                    return this.has(v[n[0]], path.replace(/^[^\.]+\./, ''));
                }
            }
        }

        return true;
    }

    public static get(v: any, path: string, def: any = null): any {
        if ($v.isObject(v) && path in v) {
            return v![path];
        } else {
            return def;
        }
    }

    public static g(v: any, path: string, def: any = null): any {
        return $v.get(v, path, def);
    }

    public static path(v: any, path: string, def: any = null): any {
        const n = (path || '').split('.');

        if (!v || !$v.has(v, n[0])) {
            return def;
        } else if (n.length === 1) {
            return $v.v(v[n[0]], def);
        } else {
            return this.path(v[n[0]], path.replace(/^[^\.]+\./, ''), def);
        }
    }

    public static p(v: any, path: string, def: any = null): any {
        return $v.path(v, path, def);
    }

    public static isType(val: any, type: string | string[]) {

        const types = (typeof (type) === 'string') ? [type] : type;
        const vt = typeof (val);

        return (types.indexOf(vt) >= 0);
    }

    /**
     *
     * @param v
     * @returns {boolean}
     */
    public static isObject(v: any): boolean {
        return $v.isType(v, 'object');
    }

    /**
     *
     * @param v
     * @returns {boolean}
     */
    public static isFunction(v: any): boolean {
        return $v.isType(v, 'function');
    }

    /**
     *
     * @param {Array<T>} v
     * @param {string} key
     * @param find
     * @returns {T}
     */
    public static find<T>(v: any[], key: string, find: any): T | null {
        let r = null;
        if (Array.isArray(v)) {
            v.some((row: any) => {

                if ($v.has(row, key) && row[key] === find) {
                    r = row;
                    return true;
                } else {
                    return false;
                }
            });
        }

        return r;
    }

    public static findKey(v: any, key: any): string | null {

        for (const i of Object.keys(v)) {
            // @ts-ignore
            if (v[i] === key) {
                return i;
            }
        }

        return null;
    }

    /**
     *
     */
    public static birthDay(bd: string): moment.Moment | null {
        if (!bd) {
            // console.log('no bd');
            return null;
        }

        const seg = bd.split('-');
        return moment(sprintf('%04s-%02s-%02s', seg[0], seg[1], seg[2])).tz('Asia/Tokyo');
    }

    /**
     *
     */
    public static date(dt: any = null): moment.Moment {
        // console.log('$v.datetime() > %s', dt);
        return moment(dt || moment().format('YYYY-MM-DD'));
    }

    /**
     *
     */
    public static now(): moment.Moment {
        return $v.datetime();
    }

    // n回繰り返す(0から)
    public static nfor(n: number, cb: (_: number, idx: number) => void) {
        for (let i = 0; i < n; i++) {
            cb(i + 1, i);
        }
    }

    public static async nforAsync(n: number, cb: (_: number, idx: number) => Promise<any>) {
        for (let i = 0; i < n; i++) {
            await cb(i + 1, i);
        }
    }

    /**
     *
     */
    public static datetime(dt: any = null): moment.Moment {
        // console.log('$v.datetime() > %s', dt);
        return moment(dt || new Date()).tz('Asia/Tokyo');
    }

    public static datetimeFormat(dt: string | moment.Moment | null = null,
                                 format: string = 'YYYY-MM-DD HH:mm'): string {
        return $v.datetime(dt || $v.datetime()).format(format);
    }

    /**
     *
     */
    public static dateFormat(dt: string | moment.Moment | null = null, format: string = 'YYYY-MM-DD'): string {
        if (dt === '' || dt === null) {
            return $v.date().format(format);
        } else {
            return $v.date(dt).format(format);
        }
    }

    public static zeroPadding(zp: string): string {
        return zp.replace(/^0+/, '');
    }

    /**
     * axiosのパラメータ展開用
     * 入れ子構造のデータを a.b.c.d -> 'a[b][c][d] => val'へ展開
     * @param key
     * @param obj
     * @param repo
     * @param pidx
     */
    public static flat(key: string,
                       obj: any,
                       repo: { [key: string]: any } | null = null,
                       pidx: string[] | null = null): { [key: string]: any } {
        const r = repo || {};
        const idx = pidx || [];
        let sidx = idx.join('][');
        if (idx.length > 0) {
            sidx = '[' + sidx + ']';
        }
        for (const i of Object.keys(obj)) {
            const t = typeof obj[i];
            if (obj[i] && t === 'object') {
                const nidx = idx;
                nidx.push(i);
                $v.flat(key, obj[i], r, nidx);
            } else {
                const nidx = key + sidx + '[' + i + ']';
                r[nidx] = (obj[i]) ? obj[i] : '';
                // console.log('idx=', nidx);
            }
        }

        return r;
    }

    public static url(url: string, query: { [key: string]: any } | null = null): string {
        let r = url;

        if (query) {
            const qs = [];
            for (const i of Object.keys(query)) {
                const type = typeof query[i];
                if (type === 'undefined' || type === 'object' || type === 'function') {
                    continue;
                }
                qs.push(sprintf('%s=%s', i, query[i]));
            }
            if (qs.length > 0) {
                r += '?' + qs.join('&');
            }
        }

        return r;
    }

    /**
     * パス文字列最適化
     * @param path
     */
    public static pathString(path: string): string {
        return path.replace(/\/\/*/g, '/');
    }

    public static first(obj: any): any {
        for (const i of Object.keys(obj)) {
            // @ts-ignore
            return obj[i];
        }
        return null;
    }

    public static firstKey(obj: any): string | null {
        for (const i of Object.keys(obj)) {
            return i;
        }
        return null;
    }

    public static ucfirst(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    public static int(src: any, def: number | null = null): number | null {
        let r = null;

        if (typeof src === 'number') {
            return src;
        }

        if (typeof src === 'string') {
            r = Number(src);
        }

        return $v.isNumber(r) ? r : def;
    }

    /**
     * ランダムな文字列を生成
     * @param len
     */
    public static rndchars(len: number) {
        const c = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let r = '';
        while (len > 0 && r.length < len) {
            const _ = c[Math.floor(Math.random() * c.length)];
            r += _;
        }
        return r;
    }

    /**
     * x,xxMB -> を整数に返還
     * @param unit
     */
    public static unit2num(unit: string): number | null {

        const nstr = unit.replace(/([kmgtKMGT])[b|B]$/, '')
            .replace(/,/g, '')
            .replace(/[^0-9]$/, '');
        const nunit = RegExp.$1.toLocaleLowerCase();
        const rint = Number(nstr);
        let by = 1;

        switch (nunit) {
            case 'k':
                by = 1024;
                break;
            case 'm':
                by = Math.pow(1024, 2);
                break;
            case 'g':
                by = Math.pow(1024, 3);
                break;
            case 't':
                by = Math.pow(1024, 4);
                break;
            default:
                break;
        }

        if (isNaN(rint)) {
            return null;
        } else {
            return rint * by;
        }
    }

    public static num2unit(num: number, unit: string = 'k'): number {

        const units = ['', 'k', 'm', 'g', 't'];
        let ui = units.indexOf(unit);
        ui = (ui < 0) ? 0 : ui;
        return num * Math.pow(1024, ui);
    }

    public static async map(array: any[], operation: any): Promise<any> {
        return Promise.all(array.map(async (item: any) => await operation(item)));
    }

    public static uuid(): string {
        let uuid = '';
        let i;
        let random;
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;

            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return uuid;
    }

    /**
     * @param cb
     */
    public static f<T>(cb: () => T) {
        return cb();
    }

    /**
     * @param value
     * @param cb
     */
    public static tap<T>(value: any, cb: (value: any) => T) {
        return cb(value);
    }

    public static adaptInput(input: any): { name: string, value: any } {
        if (!!input.target) {
            return {
                name: input.target.name,
                value: $v.tap(input.target.value, (v: any) => {
                    const type = String($v.p(input, 'target.type') || '').toLowerCase();
                    if (['radio', 'checkbox'].indexOf(type) >= 0 && $v.has(input, 'target.checked')) {
                        return $v.p(input, 'target.checked') ? v : '';
                    } else {
                        return v;
                    }
                }),
            };
        } else {
            return input;
        }
    }

    public static optNum(value: number): number | null {
        return !$v.isNumber(value) ? null : value;
    }

    public static optStr(value: string): string | null {
        return !$v.isString(value) || !value ? null : value;
    }

    // - 2020.2.9 -------------------------------------------------------------------
    public static isArray(v: any): boolean {
        return Array.isArray(v);
    }

    public static put<T>(v: T, path: string, value: any = null): T {

        const ns = path.split('.');
        const n = ns[0].replace(/^\[/, '').replace(/\]$/, '');
        const idx: number | null = $v.tap(ns[0], (_: string) => {
            if (/^\[(\d+)\]$/.test(_)) {
                return Number(RegExp.$1);
            } else {
                return null;
            }
        });

        if (!$v.isObject(v)) {
            return v;
        }

        if (ns.length === 1) {
            // console.log('write', v, value);
            const r = {
                ...v,
                ...{
                    [n]: value,
                },
            };
            // console.log('writed', r);
            return r;
        } else {
            // console.log('deep', n);
            const nnp = ns.splice(1);
            const nn = nnp.join('.');
            if (!$v.has(v, n)) {
                return {
                    ...v,
                    ...{
                        [n]: $v.put({}, nn, value),
                    }
                };
            } else {
                if (!$v.isNull(idx)) {
                    const r = (v as any).map((_: any, i: number) => {
                        return (i === idx) ? $v.put(_, nn, value) : _;
                    });
                    return r;
                } else {
                    const r = {
                        ...v,
                        ...{
                            // @ts-ignore
                            [n]: $v.put(v[n], nn, value),
                        },
                    };
                    // console.log('up > ', r);
                    return r;
                }
            }
        }
    }

    // - 2020.2.8 -------------------------------------------------------------------

    public static puts<T>(base: T, values: any[][]): T {
        let r = {...base};

        values.map((_: any) => {
            r = $v.put(r, _[0], _[1]);
        });

        return r;
    }
}

export const $v = VarUtil;
