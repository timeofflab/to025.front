import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {AInputComponent} from "~/classes/components/a-input-component";

@Component
export default class FCheck extends AInputComponent {
    @Prop({default: '@'})
    public cid: string;

    @Prop({default: ''})
    public name: string;

}
