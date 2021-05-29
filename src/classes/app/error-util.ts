import {errorModule, IError} from "~/store/error";
import {$v} from "~/classes/utils/var-util";
import {LangLabelUtil} from "~/classes/domain/lang/lang-label-util";
import {Stability} from "~/configs/master-const";

const TAG = 'ErrorUtil';

/**
 * 401 ... 認証・セッションエラー｜回復不可能
 * 429 ... Rate limit
 * 500 ... サーバーエラー、続くならヤバい
 * 502　... サーバーインフラエラー
 * 503 ... サーバー負荷エラー
 * 504 ... サーバーインフラエラー
 * 999 ... インフラまたは通信のエラー
 */
export class ErrorUtil {

    public static id: number = 0;

    public static success(statusCode = 200) {
        errorModule.addHistory(statusCode);
    }

    public static err(id: string, code: string, message: string = '', ext: any = null) {

        const nid = id + '.' + $v.rndchars(4);

        console.log('[%s.err] err > name=%s, code=%s', TAG, id, code);
        if (code === 'e401') {
            errorModule.updateE401({
                id: nid,
                code,
                message,
                ext,
                createdAt: $v.datetimeFormat(),
            });
        }

        errorModule.updateError({
            id: nid,
            code,
            message,
            ext,
            createdAt: $v.datetimeFormat(),
        });
    }

    public static connection(name: string, e: any) {

        const res = $v.p(e, 'response');
        if (!res) {
            errorModule.addHistory(900);
            return C.err(name, 'connectError', 'connection');
        }

        console.log('[%s.connection] > name=%s status=%s statusCode=%s', TAG,
            name,
            $v.p(res, 'status'),
            $v.p(res, 'statusCode'),
            Object.keys(res));

        const statusCode = $v.tap($v.p(res, 'status') || $v.p(res, 'statusCode'), (code: string) => {
            return ($v.isEmpty(code) ? 900 : Number(code));
        });

        C.errByStatus(name, statusCode);
    }

    public static errByStatus(name: string, statusCode: number) {
        errorModule.addHistory(statusCode);
        switch (statusCode) {
            case 401:
                return C.err(name, 'e401', LangLabelUtil._('error.e401'), {
                    statusCode,
                });
            case 429:
                return C.err(name, 'e429', LangLabelUtil._('error.e429'), {
                    statusCode,
                });
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
                return C.err(name, 'e500', LangLabelUtil._('error.e500'), {
                    statusCode,
                });
            default:
                return C.err(name, 'connectError',
                    LangLabelUtil._('error.failConnect'), {
                        statusCode,
                    });
        }
    }

    public static clear() {
        errorModule.updateErrors([]);
    }

    public static isAction(name: string): boolean {
        const regs = name.split('.');
        return (regs.length > 1) ? /^(post|put|delete)/.test(regs[1]) : false;
    }

    // Getters //////////////////////////
    public static get e(): IError | null {
        return errorModule.errors[0];
    }

    public static get e401(): IError | null {
        return errorModule.e401;
    }

    public static get hasError(): boolean {
        return !!C.e401 || !!C.e;
    }

    public static get lastError(): IError | null {
        return errorModule.lastError;
    }

    public static get stability(): Stability {

        if (C.e401) {
            return Stability.Session;
        }

        const hists = errorModule.historiesDesc;
        const hlen = hists.length;
        let e500 = 0;
        let e900 = 0;

        if (hists.length === 0) {
            return Stability.Stable;
        }

        hists.map((_: number) => {
            if (_ < 400) {
                return;
            } else if (_ >= 500 && _ < 600) {
                e500++;
            } else if (_ === 900) {
                e900++;
            }
        });

        console.log('[%s.stability] hlen=%s, e500=%s, e900=%s',
            TAG,
            hlen,
            e500,
            e900
        );

        if (e500 > 0) {
            // 全部500系ならサーバーエラー
            return (e500 === hlen)
                ? Stability.ServerError
                : Stability.ServerUnstable;
        } else if (e900 > 0) {
            // 全部999なら接続エラー
            return (e900 === hlen)
                ? Stability.ConnectError
                : Stability.ConnectUnstable;
        } else {
            return Stability.Stable;
        }
    }

    public static get stabilityLang(): string {
        switch (C.stability) {
            case Stability.ServerError:
                return LangLabelUtil._('error.serverError',
                    'serverError');
            case Stability.ServerUnstable:
                return LangLabelUtil._('error.serverUnstable',
                    'serverUnstable');
            case Stability.ConnectError:
                return LangLabelUtil._('error.connectError',
                    'connectError');
            case Stability.ConnectUnstable:
                return LangLabelUtil._('error.connectUnstable',
                    'connectUnstable');
            default:
                return '';
        }
    }

    public static get stabilityIcon(): number {
        switch (C.stability) {
            case Stability.ServerError:
                return 0;
            case Stability.ServerUnstable:
                return 2;
            case Stability.ConnectError:
                return 0;
            case Stability.ConnectUnstable:
                return 2;
            default:
                return 3;
        }
    }

    public static get errorFlag(): string {
        return !!errorModule.lastError ? errorModule.lastError!.id : '';
    }

    public static get lastHistory(): number {
        return errorModule.lastHistory;
    }
}

const C = ErrorUtil;
