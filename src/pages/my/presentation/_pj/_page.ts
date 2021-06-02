import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";
import {OfficialAsyncAdataUtil} from "~/classes/utils/official-async-adata-util";
import {$v} from "~/classes/utils/var-util";
import {appProjectModule, IAppProject} from "~/store/app/project";
import EditGlobal from "~/components/pages/my/presentation/project/edit/EditGlobal";
import EditItem from "~/components/pages/my/presentation/project/edit/EditItem";
import {pageMyPresentationProjectModule} from "~/store/page/my-presentation-project";
import {ExtEdit} from "~/classes/components/ext/ext-edit";

const TAG = '/my/presentations/project/_pj/_id';
const state = {
    config: {
        editId: 'myPresentationsProject',
    },
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
export default class Id extends AToComponent {
    /**
     *
     */
    public state: any = state;

    // Method ///////////////////////////////////////
    public async load() {
        if (this.records.length === 0) {
            await appProjectModule.$get()
        }
        pageMyPresentationProjectModule.updateProject($v.p(this.record, 'id'));
        await this.selectRecord();
        this.state.view.ready = true;
    }

    public async selectRecord() {
        pageMyPresentationProjectModule.updateRecord(
            appProjectModule.records.findByKey('id', $v.p(this.state, 'param.id', '@')));
    }

    public getRecordLink(item: any): string {
        return '/my/presentation/project/' + $v.p(item, 'id');
    }

    public async addItem() {

    }

    // Events ///////////////////////////////////////
    public get extEdit(): ExtEdit {
        return new ExtEdit(this);
    }

    public async onClickAddItem(e: any) {
        await this.addItem();
    }

    // Computed /////////////////////////////////////
    public get isReady(): boolean {
        return this.state.view.ready;
    }

    public get record(): any {
        return pageMyPresentationProjectModule.record;
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
            id: $v.p(this.$route, 'params.id'),
        };
    }
}
