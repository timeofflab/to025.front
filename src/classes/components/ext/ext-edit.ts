/* eslint-disable */

import {AExt} from "@/classes/components/ext/a-ext";
import {$v} from "@/classes/utils/var-util";
import {editModule, IEdit, IEditRequest, IErrorBag} from "@/store/edit";
import {Validator} from "@/classes/validate/validator";
import {MasterConst} from "~/configs/master-const";
import Throttle from "~/classes/core/throttle";
import {ErrorUtil} from "~/classes/app/error-util";
import {LangLabelUtil} from "@/classes/domain/lang/lang-label-util";

const TAG = 'ExtEdit';

export class ExtEdit extends AExt {

    public submitThrottle: Throttle = new Throttle(2000);
    public isRequesting: boolean = false;


    // Mounted //////////////////////////////////////
    public created() {
        editModule.updateEdit({
            id: this.cid,
            input: {},
        });
    }

    public async mounted() {

        if (!this.cid) {
            console.error('cid no defined > [state.config.cid]');
            return;
        }

        editModule.updateEdit({
            id: this.cid,
            input: this.input,
        });
    }

    // Methods /////////////////////////////////////////
    public isChecked(path: string, value: any): boolean {
        return $v.p(this.input, path) === value;
    }

    public hasError(col: string | string[]): boolean {
        if ($v.isArray(col)) {
            let e = 0;
            (col as string[]).map((_: string) => {
                if (this.hasError(_)) {
                    e++;
                }
            })
            return e > 0;
        } else {
            const e = this.errors.findByKey('name', col);
            return !!e && e.messages.length > 0;
        }
    }

    public e(col: string | string[]): string[] {

        if ($v.isArray(col)) {
            let r: string[] = [];
            (col as string[]).map((_: string) => {
                const err = this.e(_);
                if (err.length > 0) {
                    r = r.from(err);
                }
            });

            return r;
        } else {
            return $v.tap(this.errors.findByKey('name', col), (eb: IErrorBag | null) => {
                return !!eb ? eb.messages : [];
            });
        }
    }

    // Methods //////////////////////////////////////////////
    public async valid(name: string | string[] = [], pinput: any = null, validator: any = null): Promise<boolean> {

        const valid = validator || $v.p(this.vue, 'state.config.validator');
        if (!valid) {
            console.error('validate form target is null > state.config.validator', valid);
            return false;
        }
        const input = pinput || $v.p(this.vue, 'input');
        const target: string[] = ($v.isString(name) ? [name] : name) as string[];

        console.log('[ExtEdit] valid() > ',
            input,
            target,
            valid,
        );

        const errors: IErrorBag[] = $v.tap(
            await Validator.valid(input, valid),
            (e: IErrorBag[]) => {
                if (target.length > 0) {
                    return e.filter((_: IErrorBag) => target.indexOf(_.name) >= 0);
                } else {
                    return e;
                }
            });

        console.log('errors > ', this.cid, errors);

        editModule.updateEdit({
            id: this.cid,
            errors: Validator.mergeError(this.errors, errors, target),
        })

        console.log('my errors > cid = %s',
            this.cid,
            this.edit,
            Validator.mergeError(this.errors, errors, target),
            (this.hasErrors ? 'ERROR!' : 'OK'),
        );

        return !this.hasErrors;
    }

    public ec(name: string | string[], base: any = {}): any {
        const names = $v.isArray(name) ? name : [name];
        return {
            ...base,
            ...{
                error: this.hasError(names as string[]),
            },
        };
    }

    public classError(name: string, base: any = {}): any {
        return this.ec(name, base);
    }

    public baseInput(): any {
        return $v.path(this.vue, 'baseInput');
    }

    public async updateErrors(upErrors: IErrorBag[]) {

        const edit = this.edit;
        const nerrors = edit.errors.filter((_: IErrorBag) => {
            return !upErrors.findByKey('name', _.name);
        });

        console.log('[%s] nerrors > ', TAG, nerrors);

        const nupErrors = upErrors.filter((_: IErrorBag) => {
            return _.messages.length > 0;
        })
        const errors = nerrors.concat(nupErrors);

        console.log('extEdit.updateErrors > ', upErrors, errors);

        editModule.updateEdit({
            ...this.edit,
            ...{
                errors,
            },
        });
    }

    public async clearErrors() {
        editModule.updateEdit({
            ...this.edit,
            ...{
                errors: [],
            },
        });
    }

    public async updateEdit(edit: IEditRequest) {
        await editModule.updateEdit({
            ...this.edit,
            ...edit,
        });
    }


    public async updateInput(input: any) {
        console.log('%s.input | cid= ', TAG, this.cid, input);
        await editModule.input({
            id: this.cid,
            input,
        });
    }

    /**
     * フォームエラー有り　
     * @param items
     */
    public hasFormErrors(items: string[] = MasterConst.Form.FormErrors): boolean {
        return ErrorUtil.hasError || this.formErrors(items).length > 0;
    }

    /**
     * フォームエラー
     * @param items
     */
    public formErrors(items: string[] = MasterConst.Form.FormErrors): string[] {

        let r: string[] = [];
        items.filter((_: string) => {
            const e = this.errors.findByKey('name', _);
            // console.log('[%s] formErrors ', TAG, _, e);
            if (!!e && e.messages.length > 0) {
                r.push(LangLabelUtil._(`validate.${e.messages[0]}`));
                // r = r.from(e.messages);
            }
        });

        return r;
    }

    public formErrorsMessage(items: string[] = MasterConst.Form.FormErrors): string {

        if (ErrorUtil.hasError) {
            const e = ErrorUtil.lastError!.code!;
            console.log('error is ', e, LangLabelUtil._(`error.${e}`));
            return LangLabelUtil._(`error.${e}`);
        }
        return this.hasError(items) ? this.formErrors(items).join("\n") : '';
    }

    public throttleSubmit(): boolean {

        if (this.isRequesting) {
            return false;
        }

        this.isRequesting = true;
        this.submitThrottle.debounce(() => {
            this.isRequesting = false;
        });

        return true;
    }

    // Events ////////////////////////////////////////
    public async onInput(evt: any) {
        // console.log('[%s.onInput]', TAG, evt);
        const v = $v.adaptInput(evt);
        await this.updateInput({
            [v.name]: v.value,
        });
    }

    // Computed //////////////////////////////////////
    public get cid(): string {
        return $v.path(this.vue, 'state.config.editId')
            || $v.path(this.vue, 'state.config.cid')
            || $v.path(this.vue, 'cid')
            || '@';
    }

    public get cidPosition(): string {

        if (!$v.isEmpty($v.p(this.vue, 'state.config.editId'))) {
            return 'state.config.editId';
        }

        if (!$v.isEmpty($v.p(this.vue, 'state.config.cid'))) {
            return 'state.config.cid';
        }

        if (!$v.isEmpty($v.p(this.vue, 'cid'))) {
            return 'cid';
        }

        return '-';
    }

    public get edit(): IEdit {
        return editModule.edits.findByKey('id', this.cid) || editModule.template;
    }

    public get input(): any {
        return this.edit!.input;
    }

    public get errors(): IErrorBag[] {
        return this.edit!.errors || [];
    }

    public get hasErrors(): boolean {
        return this.errors.length > 0;
    }
}

