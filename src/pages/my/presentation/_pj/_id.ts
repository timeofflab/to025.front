import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";
import {OfficialAsyncAdataUtil} from "~/classes/utils/official-async-adata-util";
import {$v} from "~/classes/utils/var-util";
import {appProjectModule, IAppProject} from "~/store/app/project";
import EditGlobal from "~/components/pages/my/presentation/project/edit/EditGlobal";
import EditItem from "~/components/pages/my/presentation/project/edit/EditItem";
import {pageMyPresentationProjectModule as PMPPM} from "~/store/page/my-presentation-project";
import {ExtEdit} from "~/classes/components/ext/ext-edit";
import {cmdModule, ICmd} from "~/store/cmd";
import {AppCmd} from "~/configs/app-cmd";
import {uploadModule} from "~/store/upload";
import {editModule, IEdit} from "~/store/edit";
import {To025} from "~/classes/domain/to025";
import {appAuthModule} from "~/store/app/auth";
import {MasterConst} from "~/configs/master-const";
import Draggable from 'vuedraggable';

const TAG = '/my/presentations/project/_pj/_id';
const state = {
    config: {
        editId: 'myPresentationsProject',
    },
    param: {
        pj: '',
        id: '0',
    },
    view: {
        ready: false,
        sort: false,
        migrated: false,
    },
    records: [] as any[],
}

@Component({
    components: {
        Draggable,
        EditGlobal,
        EditItem,
    }
})
export default class Id extends AToComponent {
    /**
     *
     */
    public state: any = state;


    @Watch('view.state.sort')
    public watchViewStateSort(now: boolean) {
        this.records = this.pjItems.from();
    }

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
            await appProjectModule.$get();
        }
        await this.initParamId();
        await this.selectRecord();
        await this.selectItem();

        this.state.records = this.pjItems.from();

        console.log('%s.load｜', TAG, {
            pjItems: this.pjItems,
            records: this.records
        });

        if (!this.state.view.migrated) {
            await this.migrateItem();
        }

        this.state.view.ready = true;
    }

    public async storeRecord() {
        PMPPM.updateRecord($v.puts(this.record, [
            ['ex.item.global', $v.tap(editModule.edits.findByKey('id', 'presentationProjectEditGlobal'), (edit: IEdit) => {
                return $v.p(edit, 'input');
            })],
            ['ex.item.items', this.records.map((_: any, idx: number) => {
                return ($v.p(_, 'id') === this.param.id) ? (() => {
                    const ipt = $v.p(editModule.edits.findByKey('id', 'presentationProjectEditItem'), 'input');
                    return {
                        ..._,
                        ...ipt,
                        ...{
                            id: $v.p(_, 'id', $v.rndchars(5)),
                        },
                    };
                })() : _;
            })],
        ]));
        console.log('%s.storeRecord｜stored', TAG, $v.p(this.record, 'ex.item'));
    }

    public async migrateItem() {

        let changed = 0;
        this.state.view.migrated = true;
        this.state.records = this.records.map((_: any) => {
            const id = $v.p(_, 'id');

            console.log('item > ', _);
            if (!id) {
                changed++;
                return {
                    ..._,
                    ...{id: $v.rndchars(5)},
                };
            } else {
                return _;
            }
        });
        if (changed > 0) {
            console.log('%s｜detect migration > ', TAG, this.records);
            await this.save();
        }
    }

    public hasUpload(): boolean {
        return !!uploadModule.uploads.findByKey('id', 'presentationEditItemImg');
    }

    public async saveFile() {
        await To025.File.FileUploadUtil.upload(
            'presentationEditItemImg',
            this.param.pj,
            MasterConst.To025.App.FilePurpose.PresentationProjectPageImg, {
                id: $v.p(this.record, 'id'),
                page: this.param.id,
            });
    }

    public async save() {
        await this.storeRecord();

        await PMPPM.$put({
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
        PMPPM.updateProject(this.param.pj);
        PMPPM.updateRecord(
            appProjectModule.records.findByKey('id', $v.p(this.state, 'param.pj', '@')));
    }

    public async selectItem() {
        PMPPM.updatePage(this.pjItems.findIndexByKey('id', this.param.id));
        PMPPM.updatePageItem(
            {...this.selectedItem});
    }

    public getRecordLink(item: any): string {
        return '/my/presentation/project/' + $v.p(item, 'id');
    }

    public isCurrentPageItem(idx: string) {
        return this.param.id === idx;
    }

    public async addItem() {

        const pjItems = this.pjItems || [];
        const newItem = {
            id: $v.rndchars(5),
            img: '',
            bg: '#f4f4f4',
            shadow: false,
            web: false,
            scroll: false,
            label: 'New Page',
        };

        console.log('%s.addItem｜base items', TAG, pjItems);

        this.state.records = this.records.from(newItem);
        await this.save();
        await this.$router.push(this.linkPage(newItem));
    }

    public async removeItem(idx: number) {
        try {
            PMPPM.updateRecord(
                $v.put(this.record, 'ex.item.items', this.pjItems.filter((_: any, _i: number) => {
                    return (idx !== _i);
                })));
        } catch (e) {
            PMPPM.updateRecord(
                $v.put(this.record, 'ex.item.items', []));
        }
        await this.save();
    }

    public linkPage(r: any) {
        return ['', 'my', 'presentation', this.param.pj, $v.p(r, 'id')].join('/');
    }

    public classPageItem(record: any): any {
        return {
            ['-active']: this.isCurrentPageItem($v.p(record, 'id')),
        };
    }

    public img(path: string): string {
        return To025.File.AccessUtil.path(path);
    }

    // Events ///////////////////////////////////////
    public async onClickSave() {
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

    public async onClickSort() {
        this.state.view.sort = !this.state.view.sort;
    }

    public async onClickCommitSort(e: any) {
        PMPPM.updateRecord(
            $v.put(this.record, 'ex.item.items', this.records.from()));

        console.log('%s｜onClickCommitSort', TAG, this.records);
        await this.save();
        this.state.view.sort = false;
    }

    // Computed /////////////////////////////////////
    public get param(): any {
        return this.state.param;
    }

    public get isReady(): boolean {
        return this.state.view.ready;
    }

    public get projects(): IAppProject[] {
        return appProjectModule.records;
    }

    public get selectedItem(): IAppProject | null {
        return this.pjItems.findByKey('id', this.param.id);
    }

    public get pjGlobal(): any {
        return $v.p(this.record, 'ex.item.global');
    }

    public get pjItems(): any {
        return $v.p(this.record, 'ex.item.items', []);
    }

    public get record(): any {
        return PMPPM.record;
    }

    public get records(): any[] {
        return this.state.records;
    }

    public get pageItem(): any {
        return PMPPM.pageItem;
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
        console.log('%s.asyncData', TAG);
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
            id: $v.p(this.$route, 'params.id', ''),
        };
    }

    public async initParamId() {

        if (this.param.id == $v.p(this.selectedItem, 'id')) {
            return;
        }

        this.state.param.id = $v.p(this.pjItems[0], 'id');

        console.log('%s.initParamId｜id=', TAG, this.param.id, this.selectedItem);

        // if (!!this.param.id) {
        //     await this.$router.push(`/my/resentatiosn/${this.record.id}/${this.param.id}`);
        // }
    }
}
