import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class ShareTwitter extends Vue {

    @Prop({default: ''})
    public url: string;

    @Prop({default: ''})
    public tag: string;

    @Prop({default: ''})
    public title: string;

    public get path(): any {
        return 'https://twitter.com/intent/tweet?url=' + this.url;
    }

}
