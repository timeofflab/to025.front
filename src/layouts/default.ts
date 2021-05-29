import Vue from 'vue';
import {Component, Watch} from "nuxt-property-decorator";
import PopupLayer from "~/components/popups/PopupLayer";
import {AOfficialLayout} from "~/classes/components/a-official-layout";
import Console from "~/components/pages/share/Console";

const TAG = 'layouts/official/default';

@Component({
    components: {
        PopupLayer,
        Console,
    }
})
export default class Default extends AOfficialLayout {

    public isConsole: boolean = false;

    // Methods ////////////////////////////////////////////////////
    public async created() {
        this.execPageLoading();
    }

    public async mounted() {

        if (!process.client) {
            return;
        }
    }

    // Events ///////////////////////////////////////////////////////
    // Computed /////////////////////////////////////////////////////////////////
}






