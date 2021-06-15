import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {AInputComponent} from "~/classes/components/a-input-component";
import {ISelect} from "~/classes/app/impl";
import {ExtEdit} from "~/classes/components/ext/ext-edit";
import {IEdit, IEditSchema, IErrorBag} from "~/store/edit";
import {$v} from "~/classes/utils/var-util";

const TAG = 'FRadio';

type SelectValue = string | number | null;

@Component
export default class FRadio extends AInputComponent {

    @Prop({default: '@'})
    public cid: string;

    @Prop()
    public name: string;

    @Watch('value')
    public watchValue(now: any) {

        if (now === null) {
            this.extEdit.updateInput({
                [this.name]: this.values[0].value,
            }).then();
        } else if ($v.isString(now)) {
            this.extEdit.updateInput({
                [this.name]: Number(now),
            }).then();
        }
    }

    public async mounted() {
        console.log('[%s.mounted]', TAG, this.$attrs);
    }

    // Methods //////////////////////////////////////////
    public isSelected(value: SelectValue): boolean {
        return this.value === value;
    }

    public itemId(item: ISelect): string {
        return `${this.name}_${item.value}`;
    }

    // Events /////////////////////////////////////////////
    public async onInput(e: any) {
        await this.extEdit.onInput(e);
    }

    public async onFocus(e: any) {
    }

    public async onBlur(e: any) {
    }

    // Computed //////////////////////////////////////////
    public get eid(): string {
        return this.id || `ipt-${this.name}`;
    }

    public get extEdit(): ExtEdit {
        return new ExtEdit(this);
    }

    public get edit(): IEdit {
        return this.extEdit.edit;
    }

    public get input(): any {
        return this.extEdit.input;
    }

    public get value(): any {
        return $v.p(this.input, this.name, this.values[0].value);
    }

    public get schema(): IEditSchema | null {
        return (this.edit.schemas || []).findByKey('name', this.name);
    }

    public get id(): string {
        return 'ipt_' + $v.p(this.schema, 'name');
    }

    public get type(): string {
        return $v.p(this.schema, 'type', 'text');
    }

    public get placeholder(): string {
        return $v.p(this.schema, 'placeholder',
            $v.p(this.schema, 'name'));
    }

    public get maxlength(): number {
        return $v.p(this.schema, 'maxlength', 1000);
    }

    public get error(): IErrorBag | null {
        return !!this.edit ? this.edit.errors.findByKey('name', this.name) : null;
    }

    public get hasError(): boolean {
        return !!this.error;
    }

    public get ec(): any {
        return this.hasError ? 'error' : {};
    }

    public get eMessages(): any {
        return this.hasError ? this.error!.messages! : [];
    }

    public get classBase(): any {
        return {
            ['en']: (['1', 'true', 'on'].indexOf(String($v.p(this.schema, 'en'))) >= 0)
        };
    }

    public get classInput(): any {
        return this.classBase;
    }

    public get classTextarea(): any {
        return this.classBase;
    }

    ///
    public get values(): ISelect[] {
        return $v.p(this.schema, 'values', []);
    }

    public get title(): string {
        return $v.p(this.schema, 'title', []);
    }
}
