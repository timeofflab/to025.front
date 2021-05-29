import {Vue, Component} from 'nuxt-property-decorator';
import {IPopup, popupModule} from "~/store/popup";
import Confirm from "~/components/popups/Confirm";
import Alert from "~/components/popups/Alert";
import Privacy from "~/components/popups/Privacy";
// import ScrapSearch from "~/components/popups/ScrapSearch";
import {AToComponent} from "~/classes/components/a-to-component";

@Component({
    components: {
        Alert,
        Confirm,
        Privacy,
//         ScrapSearch,
    },
})
export default class PopupLayer extends AToComponent {

    public dummy = [
        {
            id: 'myTicketEdit',
            component: 'ticket-edit',
        }
    ];

    // Methods /////////////////////////////////
    public stylePopup(p: IPopup, idx: number): any {
        return {
            ['z-index']: Number(this.popups.length - idx),
        };
    }

    // Computed /////////////////////////////////
    public get popups(): IPopup[] {
        return popupModule.popups || []; // this.dummy;
    }

    public get classRoot(): any {
        return {
            show: this.popups.length > 0,
        };
    }
}
