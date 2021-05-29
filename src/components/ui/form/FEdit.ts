import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {AInputComponent} from "~/classes/components/a-input-component";
import {ExtEdit} from "~/classes/components/ext/ext-edit";
import {IEdit, IEditSchema} from "~/store/edit";
import {$v} from "~/classes/utils/var-util";
import {ISelect} from "~/classes/app/impl";

/**
 * editModule.edits > IEditから取得してFGInputを生成
 */
@Component
export default class FEdit extends AInputComponent {

    @Prop()
    public cid: string;

    @Prop()
    public name: string;

    // Events /////////////////////////////////////////
    public async onInput(e: any) {
        this.$emit('input', e);
    }

    public async onFocus(e: any) {
        this.$emit('focus', e);
    }

    public async onBlur(e: any) {
        this.$emit('blur', e);
    }

    // Computed ///////////////////////////////////////
    //
    public get extEdit(): ExtEdit {
        return new ExtEdit(this);
    }

    public get edit(): IEdit | null {
        return this.extEdit.edit;
    }

    public get schema(): IEditSchema | null {
        return ($v.p(this.extEdit.edit, 'schemas') || [])
            .findByKey('name', this.name);
    }

    public get required(): boolean {
        return $v.p(this.schema, 'required') === true;
    }

    public get maxlength(): number {
        return $v.p(this.schema, 'maxlength') || 100;
    }

    public get values(): ISelect {
        return $v.p(this.schema, 'values') || [];
    }

    public get type(): string {
        return $v.p(this.schema, 'type');
    }

    public get en(): string {
        return $v.p(this.schema, 'en');
    }

    public get title(): string {
        return $v.p(this.schema, 'title');
    }

    public get value(): any {
        return $v.p(this.edit, `input.${this.name}`);
    }

}
