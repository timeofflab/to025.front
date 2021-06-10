import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";

@Component
export default class NMImg extends AToComponent {
    @Prop({default: ''})
    public m: string;
}
