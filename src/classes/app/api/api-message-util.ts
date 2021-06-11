import {IApiMessage, IApiMessageFail, IApiMessageSuccess} from "~/classes/core/i";
import {$v} from "~/classes/utils/var-util";

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

        const err = $v.p(e, 'response.data.error');
        return (!err)
            ? self.error('-', [$v.p(e, 'message')], ex)
            : {
                result: false,
                code: $v.p(err, 'code'),
                ex: {
                    ...{
                        statusCode: $v.p(e, 'response.status'),
                        req: {
                            host: $v.p(e, 'request.host'),
                            protocol: $v.p(e, 'request.protocol'),
                            method: $v.p(e, 'request.method'),
                            path: $v.p(e, 'request.path'),
                        },
                    },
                    ...ex,
                    ...{
                        messages: $v.p(err, 'messages', []),
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
