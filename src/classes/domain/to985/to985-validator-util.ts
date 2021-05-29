import {LangLabelUtil} from "~/classes/domain/lang/lang-label-util";
import {$v} from "~/classes/utils/var-util";
import {IApiMessageFail} from "~/classes/core/i";
import {ApiMessageUtil} from "~/classes/app/api/api-message-util";
import {NameStyleUtil} from "~/classes/utils/name-style-util";
import {LangValidate} from "~/configs/lang/share";

const TAG = 'To985ValidatorUtil';
const _ = LangLabelUtil._;

export class To985ValidatorUtil {

    public static o(key: string, param: any = {}): any {
        return {
            elm: key,
            message: _(`validate.${key}`, key, param),
        };
    }

    public static validError(e: any): IApiMessageFail {
        return ApiMessageUtil.validError(
            To985ValidatorUtil.adaptMessage(
                $v.p(e, 'response.data.messages', []),
            ))
    }

    public static adaptMessage(messages: any): any {

        const r: any[] = [];
        Object.keys(messages).map((k: string) => {
            r.push({
                name: k,
                messages: [
                    self.message($v.p(messages, `${k}.0`)),
                ],
            });
        });

        return r;
    }

    /**
     * Code -> Message
     * @param key
     */
    public static message(key: string): string {
        const mkey = NameStyleUtil.s2c(key.replace(/^validation\./, ''));
        console.log('%s.message｜mkey=', TAG, mkey);
        return $v.p(LangValidate.ja, mkey, mkey);
    }
}


const self = To985ValidatorUtil;
