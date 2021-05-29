import {$v} from "@/classes/utils/var-util";
import {IErrorBag} from "@/store/edit";
import {EnvUtil} from "~/classes/utils/env-util";

export default class ApiClientUtil {


    public static baseUrl(): string {
        return EnvUtil.API_BASE_URL; //'/api/v1';
    }

    public static get isDummy(): boolean {
        return EnvUtil.API_MODE.toLowerCase() === 'dummy';
    }

    public static get postcodeUrl(): string {
        return EnvUtil.API_POSTCODE_URL; //'/api/v1';
    }

    public static res2Record<T>(res: any): T {
        return $v.path(res, 'data.record') as T;
    }

    /**
     * @param res
     * @param name
     */
    public static res2Error(res: any, name: string = '@request'): IErrorBag {
        const message = $v.p(res, 'response.data.message');
        const messages = $v.p(res, 'response.data.messages');

        return {
            name,
            messages: messages || [message || ''],
        };
    }

    /**
     * @param res
     * @param name
     */
    public static res2Errors(res: any, name: string = '@request'): IErrorBag[] {
        return $v.p(res, 'response.data.messages') || [];
    }

    /**
     * @param res
     */
    public static res2ValidError(res: any): IErrorBag[] {
        return $v.p(res, 'response.data.messages');
    }
}

