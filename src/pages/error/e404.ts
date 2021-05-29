import {Component} from "nuxt-property-decorator";
import {appModule} from '~/store/app';
import {officialModule} from '~/store/official';
import PageE404 from '~/components/pages/share/PageE404.vue';
import {OfficialAsyncAdataUtil} from "~/classes/utils/official-async-adata-util";
import {AOfficialComponent} from "~/classes/components/a-official-component";

const state = {
    config: {
        lang: 'pages.e404',
    },
};

@Component({
    components: {
        PageE404,
    },
})
export default class E404 extends AOfficialComponent {

    public pageId: string = 'e404';

    public mounted() {
        officialModule.updatePageId(this.pageId);
    }

    public get isLoading(): any {
        return appModule.loading;
    }


    /////////////////////////////////////////////////////////////////////
    // 共通
    /////////////////////////////////////////////////////////////////////
    public state: any = {};

    // Inits ////////////////////////////////////////////////////////////
    public async asyncData(ctx: any) {
        return await OfficialAsyncAdataUtil.load(ctx, state);
    }

    public head() {
        return super._AOfficialComponent_head();
    }

    public async created() {
        this._AOfficialComponent_create();
    }
}
