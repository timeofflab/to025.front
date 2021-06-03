import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {editModule, IEdit, IEditSchema, IErrorBag} from "~/store/edit";
import {$v} from "~/classes/utils/var-util";
import Bubble from "~/components/ui/Bubble";
import {ExtEdit} from "~/classes/components/ext/ext-edit";
import {AInputComponent} from "~/classes/components/a-input-component";
import {cmdModule} from "~/store/cmd";
import {AppCmd} from "~/configs/app-cmd";

const TAG = 'FInput';

@Component({
    components: {
        Bubble,
    },
})
export default class FInput extends AInputComponent {

    // Spec required -----------------------------------
    @Prop()
    public cid: string;

    @Prop()
    public title: string;

    @Prop()
    public name: string;

    //
    public bubbleTimer: number;

    public async showBubble() {
    }

    // Events ---------------------------------------
    public async onInput(e: any) {
        await this.extEdit.onInput(e);
        this.showBubble().then();
    }

    public async onFocus(e: any) {
    }

    public async onBlur(e: any) {
    }

    // Getter ///////////////////////////////
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

    public get value(): any {
        return $v.p(this.input, this.name);
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
}
