import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {editModule, IEdit, IErrorBag} from "~/store/edit";
import {$v} from "~/classes/utils/var-util";
import Bubble from "~/components/ui/Bubble";
import {ExtEdit} from "~/classes/components/ext/ext-edit";
import {AInputComponent} from "~/classes/components/a-input-component";

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

    @Prop({default: 100})
    public maxlength: number;

    @Prop({default: true})
    public parentEmit: boolean;

    @Prop({default: true})
    public useBubble: boolean;

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
        await this.triggerParentEmit('input', this.adaptInput(e));
        this.showBubble().then();
    }

    public async onFocus(e: any) {
        await this.triggerParentEmit('focus', e);
    }

    public async onBlur(e: any) {
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

    public get classBase(): any {
        return {
            ['en']: (['1', 'true', 'on'].indexOf(String(this.en)) >= 0)
        };
    }

    public get classInput(): any {
        return this.classBase;
    }

    public get classTextarea(): any {
        return this.classBase;
    }
}
