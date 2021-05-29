import {$vh} from "~/classes/utils/vue-helper";
import {LangLabelUtil} from "~/classes/domain/lang/lang-label-util";
import {$v} from "~/classes/utils/var-util";

export class ValidatorHelper {
    /**
     * @param pmessage
     * @param option
     * @param base
     */
    public static validateOption(pmessage: string, option: any = {}, base: any = {}): any {

        const message = $v.tap(null, () => {
            let r = String(LangLabelUtil._(`validate.${pmessage}`));
            const params = $v.isObject(option) ? Object.keys(option) : [];

            params.map((_: string) => {
                const v = option[_];
                r = r.replace(new RegExp(`%${_}%`, 'g'), v);
            });

            return r;
        });

        return {
            ...{
                message,
            },
            ...base,
        };
    }
}

export const vo = ValidatorHelper.validateOption;
