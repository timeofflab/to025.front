import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class ShareFb extends Vue {

    @Prop({default: ''})
    public url: string;

    public get path(): any {
        return 'https://www.facebook.com/sharer/sharer.php?u=' + this.url;
    }

}
