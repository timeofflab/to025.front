import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";
import {OfficialAsyncAdataUtil} from "~/classes/utils/official-async-adata-util";
import {$v} from "~/classes/utils/var-util";
import {appProjectModule, IAppProject} from "~/store/app/project";
import EditGlobal from "~/components/pages/my/presentation/project/edit/EditGlobal";
import EditItem from "~/components/pages/my/presentation/project/edit/EditItem";
import {pageMyPresentationProjectModule} from "~/store/page/my-presentation-project";
import {ExtEdit} from "~/classes/components/ext/ext-edit";
import {cmdModule, ICmd} from "~/store/cmd";
import {AppCmd} from "~/configs/app-cmd";

const TAG = '/my/presentations/project/_pj/_id';
const state = {
    config: {
        editId: 'myPresentationsProject',
    },
    param: {
        pj: '',
        page: '0',
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
export default class Page extends AToComponent {
    /**
     *
     */
    public state: any = state;

    @Watch('cmds')
    public watchCmds() {

    }

    // Method ///////////////////////////////////////
    public async load(force: boolean = false) {
        if (force || this.records.length === 0) {
            await appProjectModule.$get()
        }
        await this.selectRecord();
        await this.selectItem();
        this.state.view.ready = true;
    }

    public async save() {
        await appProjectModule.$put({
            record: this.record,
        });
        await this.load(true);
    }

    public async selectRecord() {
        pageMyPresentationProjectModule.updateProject(this.state.param.pj);
        pageMyPresentationProjectModule.updateRecord(
            appProjectModule.records.findByKey('id', $v.p(this.state, 'param.pj', '@')));
    }

    public async selectItem() {
        pageMyPresentationProjectModule.updatePage(this.state.param.page);
        pageMyPresentationProjectModule.updatePageItem(
            $v.p(this.pjItems || [], this.state.param.page));
    }

    public getRecordLink(item: any): string {
        return '/my/presentation/project/' + $v.p(item, 'id');
    }

    public isCurrentPageItem(idx: number) {
        return Number(this.state.param.page) === idx;
    }

    public async addItem() {
        pageMyPresentationProjectModule.updateRecord(
            $v.put(this.record, 'ex.item.items', this.pjItems.from([{
                img: '',
                bg: '#f4f4f4',
                shadow: false,
                web: false,
                scroll: false,
                label: 'New Page',
            }])));
        await this.save();
        await this.$router.push(this.linkPage(this.pjItems.length - 1));
    }

    public async removeItem(idx: number) {
        pageMyPresentationProjectModule.updateRecord(
            $v.put(this.record, 'ex.item.items', this.pjItems.filter((_: any, _i: number) => {
                return (idx !== _i);
            })));
        await this.save();
    }

    public linkPage(idx: number) {
        return ['', 'my', 'presentation', this.state.param.pj, idx].join('/');
    }

    public classPageItem(idx: number): any {
        return {
            ['-active']: this.isCurrentPageItem(idx),
        };
    }

    // Events ///////////////////////////////////////
    public get extEdit(): ExtEdit {
        return new ExtEdit(this);
    }

    public async onClickAddItem(e: any) {
        await this.addItem();
    }

    public async onClickRemoveItem(idx: number) {

        if (!confirm('Delete')) {
            return;
        }
        await this.removeItem(idx);
    }

    // Computed /////////////////////////////////////
    public get isReady(): boolean {
        return this.state.view.ready;
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

    public get record(): any {
        return pageMyPresentationProjectModule.record;
    }

    public get pageItem(): any {
        return pageMyPresentationProjectModule.pageItem;
    }

    public get cmds(): ICmd[] | null {
        return cmdModule.queues.filter((_: ICmd) => {
            return [
                AppCmd.PresentationProjectSave.toString(),
            ].indexOf(_.cmd) >= 0;
        });
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
            pj: $v.p(this.$route, 'params.pj'),
            page: $v.p(this.$route, 'params.page', '0'),
        };
    }
}
