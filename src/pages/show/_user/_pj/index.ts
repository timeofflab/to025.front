import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AOfficialComponent} from "~/classes/components/a-official-component";
import {OfficialAsyncAdataUtil} from "~/classes/utils/official-async-adata-util";

const TAG = '/';
const state = {
    config: {
        lang: 'pages.index',
    },
};

@Component({
    components: {}
})
export default class P extends AOfficialComponent {
    // Base //////////////////////////////////////////////////
    public async asyncData(ctx: any) {
        ctx.redirect('./0');
    }
}
