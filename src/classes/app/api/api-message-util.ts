import {IApiMessage, IApiMessageFail, IApiMessageSuccess} from "~/classes/core/i";
import {$v} from "~/classes/utils/var-util";

const TAG = 'ApiMessageUtil';

export class ApiMessageUtil {
    /**
     * @param ex
     */
    public static success(ex: any = null): IApiMessageSuccess {
        return {
            result: true,
            ex,
        };
    }

    /**
     *
     * @param code
     * @param messages
     */
    public static error(code: string, messages: any[] = [], ex: any = {}): IApiMessageFail {
        return {
            result: false,
            code,
            ex: {
                ...ex,
                ...{
                    messages,
                },
            },
        };
    }

    /**
     *
     * @param e
     * @param ex
     */
    public static e(e: any, ex: any = {}): IApiMessageFail {

        const req = $v.p(e, 'request');
        const errorCode = $v.p(req, 'res.data.error.code', '');
        const statusCode = $v.p(req, 'res.statusCode');
        const code = (() => {

            if (!$v.isEmpty(errorCode)) {
                return errorCode;
            }

            switch (statusCode) {
                case 400:
                    return 'badRequest';
                case 401:
                    return 'authorization';
                case 403:
                    return 'permission';
                case 404:
                    return 'notFound';
                case 500:
                    return 'serverError';
                default:
                    return '-';
            }
        })();


        return (!req)
            ? self.error('-', [$v.p(e, 'message')], ex)
            : {
                result: false,
                code,
                ex: {
                    ...{
                        statusCode,
                        req: {
                            host: $v.p(req, 'host'),
                            protocol: $v.p(req, 'protocol'),
                            method: $v.p(req, 'method'),
                            path: $v.p(req, 'path'),
                        },
                    },
                    ...ex,
                    ...{
                        messages: $v.p(req, 'messages', []),
                    },
                },
            };
    }

    /**
     *
     * @param messages
     */
    public static validError(messages: any[]): IApiMessageFail {
        return {
            result: false,
            code: 'validateError',
            ex: {
                messages,
            },
        };
    }
}

const self = ApiMessageUtil;
