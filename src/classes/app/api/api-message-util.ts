import {IApiMessage, IApiMessageFail, IApiMessageSuccess} from "~/classes/core/i";

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
