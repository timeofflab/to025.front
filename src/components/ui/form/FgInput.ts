import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {editModule, IEdit, IEditSchema, IErrorBag} from "~/store/edit";
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
    // Getter ///////////////////////////////
    public get eid(): string {
        return `ipt_${this.name}`;
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

    public get type(): string {
        return $v.p(this.schema, 'type', 'text');
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

    public get required(): boolean {
        return !!$v.p(this.schema, 'required', false);
    }

    public get remainingLength(): number {
        return 0;
        // if (!this.useBubble || !this.value) {
        //     return 0;
        // }
        //
        // return this.maxlength - this.value.length;
    }

    public get useBubble(): boolean {
        return false;
    }
}
