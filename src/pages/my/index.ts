import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";
import {appProjectModule, IAppProject} from "~/store/app/project";
import {OfficialAsyncAdataUtil} from "~/classes/utils/official-async-adata-util";
import {$v} from "~/classes/utils/var-util";

const state = {
    conifg: {},
    view: {
        ready: false,
    },
};

@Component
export default class Index extends AToComponent {

    public state: any = state;

    // Methods ///////////////////////////////
    public async load() {
        await appProjectModule.$get();
        this.state.view.ready = true;
    }

    public getRecordLink(item: any): string {
        return '/my/presentation/project/' + $v.p(item, 'id');
    }

    // Evnets /////////////////////////////////

    // Computeds ///////////////////////////////
    public get isReady(): boolean {
        return this.state.view.ready;
    }

    public get hasRecords(): boolean {
        return appProjectModule.records.length > 0;
    }

    public get records(): IAppProject[] {
        return appProjectModule.records;
    }

    // Init ///////////////////////////////////
    public async asyncData(ctx: any) {
        return OfficialAsyncAdataUtil.load(ctx, state);
    }

    public async mounted() {
        await this.load();
    }
}
