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
import {uploadModule} from "~/store/upload";
import {editModule, IEdit} from "~/store/edit";
import {To025} from "~/classes/domain/to025";
import {appAuthModule} from "~/store/app/auth";

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

    @Watch('fileCmd')
    public watchFileCmd(now: any) {
        console.log('%s.watchFileCmd', TAG, now);
        if (!now) {
            return;
        }

        // $v.p(now, 'request.cid')
        uploadModule.updateUpload({
            id: 'presentationEditItemImg',
            files: $v.p(now, 'request.ext.files'),
        });
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

    public async storeRecord() {
        pageMyPresentationProjectModule.updateRecord($v.puts(this.record, [
            ['ex.item.global', $v.tap(editModule.edits.findByKey('id', 'presentationProjectEditGlobal'), (edit: IEdit) => {
                return $v.p(edit, 'input');
            })],
            ['ex.item.items', (this.pjItems || []).map((_: any, idx: number) => {
                return (idx === Number(this.state.param.page)) ? (() => {
                    return $v.p(editModule.edits.findByKey('id', 'presentationProjectEditItem'), 'input')
                })() : _;
            })],
        ]));
        console.log('%s.storeRecord｜stored', TAG, $v.p(this.record, 'ex.item'));
    }

    public hasUpload(): boolean {
        return !!uploadModule.uploads.findByKey('id', 'presentationEditItemImg');
    }

    public async saveFile() {
        await To025.File.FileUploadUtil.upload(
            'presentationEditItemImg',
            this.state.param.pj,
            ['presentation',
                'project',
                'page',
                this.state.param.page,
                'img'].join('/'));
    }

    public async save() {
        await this.storeRecord();
        await appProjectModule.$put({
            record: this.record,
        });

        console.log('%s｜saveFile - 1', TAG, {
            id: this.record.id,
            uploads: uploadModule.uploads,
        });
        if (this.record.id && this.hasUpload()) {
            console.log('%s｜saveFile - 2');
            await this.saveFile();
        }

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

        const pjItems = this.pjItems || [];

        console.log('pjItems', pjItems);
        pageMyPresentationProjectModule.updateRecord(
            $v.put(this.record, 'ex.item.items', (this.pjItems || []).from({
                img: '',
                bg: '#f4f4f4',
                shadow: false,
                web: false,
                scroll: false,
                label: 'New Page',
            })));
        await this.save();
        await this.$router.push(this.linkPage(this.pjItems.length - 1));
    }

    public async removeItem(idx: number) {
        try {
            pageMyPresentationProjectModule.updateRecord(
                $v.put(this.record, 'ex.item.items', this.pjItems.filter((_: any, _i: number) => {
                    return (idx !== _i);
                })));
        } catch (e) {
            pageMyPresentationProjectModule.updateRecord(
                $v.put(this.record, 'ex.item.items', []));
        }
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
    public async onClickSave() {

        if (!confirm('Save')) {
            return;
        }

        await this.save();
    }

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
        return $v.p(this.record, 'ex.item.items', []);
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

    public get fileCmd(): ICmd | null {
        return cmdModule.queues
            .slice()
            .reverse()
            .find((_: ICmd) => {
                const cid = $v.p(_, 'request.cid');
                const name = $v.p(_, 'request.name');
                return (cid === 'presentationProjectEditItem'
                    && name === 'img');
            });
    }

    public get auth(): any {
        return appAuthModule.auth;
    }

    public get previewUrl(): string {
        const accKey = $v.p(appAuthModule.auth, 'user.accKey');
        const pj = this.record.id;
        return `/show/project/${accKey}/${pj}/0`;
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
