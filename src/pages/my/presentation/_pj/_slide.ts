import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";
import {OfficialAsyncAdataUtil} from "~/classes/utils/official-async-adata-util";
import {$v} from "~/classes/utils/var-util";
import {appProjectModule, IAppProject} from "~/store/app/project";
import EditGlobal from "~/components/pages/my/presentation/project/edit/EditGlobal";
import EditItem from "~/components/pages/my/presentation/project/edit/EditItem";
import {pageMyPresentationProjectModule} from "~/store/page/my-presentation-project";

const state = {
    config: {},
    param: {
        id: '',
    },
    view: {
        ready: false,
    },
}

@Component({
    components: {
        EditGlobal,
        EditItem,
    }
})
export default class Slide extends AToComponent {
    /**
     *
     */
    public state: any = state;

    // Method ///////////////////////////////////////

    public async load() {
        await appProjectModule.$get()
        pageMyPresentationProjectModule.updateCurrentProject($v.p(this.record, 'id'));
        this.state.view.ready = true;
    }

    public getRecordLink(item: any): string {
        return '/my/presentation/project/' + $v.p(item, 'id');
    }

    // Computed /////////////////////////////////////
    public get isReady(): boolean {
        return this.state.view.ready;
    }

    public get record(): any {
        return appProjectModule.records.findByKey('id', $v.p(this.state, 'param.id', '@'));
    }

    public get records(): IAppProject[] {
        return appProjectModule.records;
    }

    public get pjGlobal(): any {
        return $v.p(this.record, 'ex.item.global');
    }

    public get pjItems(): any {
        return $v.p(this.record, 'ex.item.items');
    }

    // Init //////////////////////////////////////////////////
    /**
     *
     * @param ctx
     */
    public async asyncData(ctx: any) {
        return OfficialAsyncAdataUtil.load(ctx, state);
    }

    /**
     *
     */
    public async mounted() {
        await this.initParam();
        await this.load();
    }

    public async initParam() {
        this.state.param = {
            id: $v.p(this.$route, 'params.slide'),
        };
    }
}
