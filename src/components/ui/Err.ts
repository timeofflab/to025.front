import {Component, Prop} from 'nuxt-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";

@Component
export default class Err extends AToComponent {

    @Prop({default: []})
    public e: string[];

    public state = {
        config: {
            lang: 'validate',
        },
    };

    public msg(msg: string): string {
        return this.__(msg, msg);
    }

    public get hasMessages(): boolean {
        return Array.isArray(this.e) && this.e.length > 0;
    }
}
