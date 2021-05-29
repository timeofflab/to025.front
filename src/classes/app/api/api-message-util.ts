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
