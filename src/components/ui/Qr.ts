import {Component, Prop, Watch} from 'nuxt-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";
import VueQrcode from "@chenfengyuan/vue-qrcode";

@Component({
    components: {
        VueQrcode,
    },
})
export default class Qr extends AToComponent {

    @Prop({default: ''})
    public str: string;

    @Prop({default: 800})
    public w: number;

    public state = {
        config: {
            qr: {
                errorCorrectionLevel: "M",
                maskPattern: 0,
                margin: 10,
                scale: 2,
                width: this.w,
                color: {
                    dark: "#444444FF",
                    light: "#FFFFFF00"
                },
            },
        },
    };

    @Watch('str')
    public watchStr() {
        this.$forceUpdate();
    }

    public async mounted() {
        console.log('[Qr] > mounted > ', this.str);
    }

    // Getter //////////////////////////////
}
