import {Component, Vue} from 'vue-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";

@Component
export default class PageE404 extends AToComponent {

    public state = {
        config: {
            lang: 'page.error',
        },
    };

}


