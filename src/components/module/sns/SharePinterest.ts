import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class SharePinterest extends Vue {

    @Prop({default: ''})
    public url: string;

    @Prop({default: ''})
    public description: string;

    public get path(): any {
        return 'https://pinterest.com/pin/create/button/?url=' + this.url + '&description=' + this.description;
    }

}
