import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";
import {appProjectModule, IAppProject} from "~/store/app/project";
import {OfficialAsyncAdataUtil} from "~/classes/utils/official-async-adata-util";
import {$v} from "~/classes/utils/var-util";
import {pageMyPresentationProjectModule} from "~/store/page/my-presentation-project";

const TAG = '/my';
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
        const res = await pageMyPresentationProjectModule.$post();
        const nid = $v.p(res, 'ex.record.id');
        console.log('%s.post｜nid', TAG, res, nid);
        if (!!nid) {
            await this.$router.push(`/my/presentation/${nid}/0`);
        }
    }

    public async delete(id: string) {
        await pageMyPresentationProjectModule.$delete(id);
        appProjectModule.removeRecord(id);
    }

    public getRecordLink(item: any): string {
        return '/my/presentation/' + $v.p(item, 'id') + '/0';
    }

    // Evnets /////////////////////////////////
    public async onClickRemove(id: string) {
        if (!confirm('Delete?')) {
            return false;
        }

        await this.delete(id);
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
