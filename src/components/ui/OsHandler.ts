import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import $ from 'jquery';
import {scrollModule} from "~/store/scroll";

@Component
export default class OsHandler extends Vue {

    @Prop({default: '@'})
    public cid: string;

    private handler: any;

    public mounted() {
        this.handler = $((this.$refs['my'] as HTMLElement))
            .closest('.os-viewport');

        if (this.handler) {
            console.log('handler exists');
            this.handler.on('scroll', this.onScroll);
        }
    }

    public destroyed() {
        if (!!this.handler) {
            this.handler.off('scroll', this.onScroll);
        }
    }

    public onScroll(e: any) {
        const st: number | undefined = $(this.handler).scrollTop();
        if (st !== undefined) {
            scrollModule.updateScroll({
                id: this.cid,
                scrollTop: Number(st),
            });
        }
    }
}
