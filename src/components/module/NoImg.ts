import {Vue, Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class NoImg extends Vue {

    @Prop({default: 18})
    public no: number;

    public get aryNo(): any{
        return Array.from(String(this.no));
    }

}
