import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class ShareMail extends Vue {

    @Prop({default: ''})
    public url: string;

    public get path(): any {
        return 'mailto:info@yourmail.com?&subject=&body=' + this.url;
    }

}
