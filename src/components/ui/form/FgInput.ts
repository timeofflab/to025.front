import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {editModule, IEdit, IErrorBag} from "~/store/edit";
import {$v} from "~/classes/utils/var-util";
import Bubble from "~/components/ui/Bubble";
import {ExtEdit} from "~/classes/components/ext/ext-edit";
import {AInputComponent} from "~/classes/components/a-input-component";
import {ISelect} from "~/classes/app/impl";

const TAG = 'FgInput';

@Component({
    components: {
        Bubble,
    },
})
export default class FgInput extends AInputComponent {

    // Spec required -----------------------------------
    @Prop()
    public cid: string;

    @Prop()
    public title: string;

    @Prop()
    public name: string;

    // Optional -----------------------------------
    @Prop({default: ''})
    public id: string;

    @Prop({default: 'text'})
    public type: string;

    @Prop({default: ''})
    public en: string;

    @Prop({default: ''})
    public placeholder: string;

    @Prop({default: 'error'})
    public eclass: any;

    @Prop({default: 50})
    public maxlength: number;

    @Prop({default: true})
    public parentEmit: boolean;

    @Prop({default: true})
    public useBubble: boolean;

    @Prop({default: true})
    public required: boolean;

    @Prop({default: null})
    public values: ISelect[] | null;

    @Prop({default: true})
    public emptyIsNull: boolean;

    public isBubble: boolean = false;

    //
    public bubbleTimer: number;

    public async showBubble() {

        this.isBubble = true;
        if (this.bubbleTimer > 0) {
            window.clearTimeout(this.bubbleTimer);
        }

        this.bubbleTimer = window.setTimeout(() => {
            this.isBubble = false;
        }, 800);
    }

    // Events ---------------------------------------
    public async onInput(e: any) {
        await this.triggerParentEmit('input', e);
        this.showBubble().then();
    }

    public async onFocus(e: any) {
        await this.triggerParentEmit('focus', e);
    }

    public async onBlur(e: any) {
        console.log('[%s.onBlur]', TAG);
        await this.triggerParentEmit('blur', e);
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

    public get error(): IErrorBag | null {
        return !!this.edit ? this.edit.errors.findByKey('name', this.name) : null;
    }

    public get hasError(): boolean {
        return !!this.error;
    }

    public get ec(): any {
        return this.hasError ? this.eclass : {};
    }

    public get eMessages(): any {
        return this.hasError ? this.error!.messages! : [];
    }

    public get value(): any {
        return $v.p(this.input, this.name);
    }

    public get remainingLength(): number {

        if (!this.useBubble || !this.value) {
            return 0;
        }

        return this.maxlength - this.value.length;
    }
}
