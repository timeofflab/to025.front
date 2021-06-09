import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";

@Component
export default class FullScreen extends AToComponent {

    // Events //////////////////////////////////////
    public async onClickClose() {

    }

    public async onClickFullscreen() {

    }

    // Computed ////////////////////////////////////
    public get isPopupFullscreen() {
        return false;
    }
}
