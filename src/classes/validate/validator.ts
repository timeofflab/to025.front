import {validate, ValidationError} from "class-validator";
import {IErrorBag} from "@/store/edit";
import {$v} from "@/classes/utils/var-util";

const TAG = 'Validator';

export class Validator {

    public static async valid<T>(ipt: any, model: any): Promise<IErrorBag[]> {

        //const model: T = new (form)();
        for (const k of Object.keys(ipt)) {
            // @ts-ignore
            model![k] = ipt[k];
        }

        console.log('%s.model｜', TAG, model);

        const e: IErrorBag[] = [];
        await validate(model).then((errors: ValidationError[]) => {
            console.log('%s.valid｜errors｜', TAG, errors);
            errors.map((_: ValidationError) => {
                const messages: string[] = [];
                for (const k of Object.keys(_.constraints!)) {
                    messages.push(_.constraints![k]);
                }

                e.push({
                    name: _.property,
                    messages: [messages[0]],
                });
            });
        });

        return e;
    }

    public static mergeError(base: IErrorBag[], e: IErrorBag | IErrorBag[], name: string | string[] = []): IErrorBag[] {
        // 指定のエラー or 未指定なら全部
        const names = $v.tap(Array.isArray(name) ? name : [name], (ns: string[]) => {
            return ns.length > 0 ? ns : base.map((_: IErrorBag) => _.name);
        });
        const r = base.filter((_: IErrorBag) => (names.indexOf(_.name) < 0));
        return r.concat(Array.isArray(e) ? e : [e]);
    }
}
