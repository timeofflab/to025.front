import {Component, Prop, Vue} from '@/node_modules/nuxt-property-decorator';

@Component
export default class Icon extends Vue {

	//m-icon-の後ろの名前
    @Prop({default: 'close'})
    public i: string;

    //タグ
    @Prop({default: 'div'})
    public tag: string;

    //サイズ
    @Prop({default: ''})
    public size: string;

    //m or c
    @Prop({default: 'm-icon-'})
    public family: string;


    public get oicon(): any {
        return this.family + this.i;
    }


    public get osize(): any {
        if(!this.size){
	        return
        }
        return '-' + this.size;
    }

}
