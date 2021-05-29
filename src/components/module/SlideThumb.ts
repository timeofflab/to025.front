import {Vue, Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class SlideThumb extends Vue {

    @Prop({default: 'a' })
    public id: string;

    @Prop({default: [] })
    public imgs: any;

    @Prop({default: 1 })
    public display: number;

//     public timer: any;
//     public now: number = 1;

//     public created() {
//         this.timer = setInterval( () => {
//             const v = Math.floor( Math.random() * 10 );
//
//             if (v == 1) {
//                 if ((this.now - 1) < this.imgs.length) {
//                     this.now++;
//
//                 } else {
//                     this.now = 1;
//                 }
//             }
//
//         }, 1000);
//     }
//
//     public async destroyed() {
//         clearInterval(this.timer);
//     }
}
