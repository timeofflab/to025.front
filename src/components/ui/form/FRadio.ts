import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {AInputComponent} from "~/classes/components/a-input-component";
import {ISelect} from "~/classes/app/impl";
import {ExtEdit} from "~/classes/components/ext/ext-edit";

const TAG = 'FRadio';

type SelectValue = string | number | null;

@Component
export default class FRadio extends AInputComponent {

    @Prop({default: '@'})
    public cid: string;

    @Prop({default: ''})
    public name: string;

    @Prop({default: null})
    public value: string | number | null;

    @Prop({default: []})
    public values: ISelect[];

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
    public get extEdit(): ExtEdit {
        return new ExtEdit(this);
    }
}
