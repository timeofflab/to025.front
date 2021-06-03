import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AOfficialComponent} from "~/classes/components/a-official-component";
import {OfficialAsyncAdataUtil} from "~/classes/utils/official-async-adata-util";
import {$v} from "~/classes/utils/var-util";

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
        const user = $v.p(ctx, 'route.params.user');
        const pj = $v.p(ctx, 'route.params.pj');

        ctx.redirect(`/show/project/${user}/${pj}/0`);
    }
}
