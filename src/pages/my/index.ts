import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";
import {appProjectModule, IAppProject} from "~/store/app/project";
import {OfficialAsyncAdataUtil} from "~/classes/utils/official-async-adata-util";
import {$v} from "~/classes/utils/var-util";
import {pageMyPresentationProjectModule} from "~/store/page/my-presentation-project";

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

    public async post() {
        await pageMyPresentationProjectModule.$post();
    }

    public async remove() {

    }

    public getRecordLink(item: any): string {
        return '/my/presentation/' + $v.p(item, 'id') + '/0';
    }

    // Evnets /////////////////////////////////
    public async onClickRemove(id: string) {
        if (!confirm('Delete?')) {
            return false;
        }

        return false;
    }

    public async onClickAdd() {
        await this.post();
    }

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
