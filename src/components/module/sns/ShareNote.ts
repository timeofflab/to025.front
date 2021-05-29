import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class ShareNote extends Vue {

    @Prop({default: ''})
    public url: string;

    @Prop({default: ''})
    public tag: string;

    public get path(): any {
        return 'https://note.com/intent/post?url=' + this.url + '/&hashtags=' + this.tag;
    }

}
