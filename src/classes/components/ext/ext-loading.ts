import {AExt} from "~/classes/components/ext/a-ext";
import {$v} from "~/classes/utils/var-util";
import {ILoading, loadingModule} from "~/store/loading";
import Vue from "vue";

const TAG = 'ExtLoading';

export class ExtLoading extends AExt {

    public loadingId: string = '@';

    constructor(vue: Vue, loadingKey: string | null = null) {
        super(vue);
        this.loadingId = loadingKey || $v.p(vue, 'state.config.loadingId', '@');
    }

    // Method /////////////////////////////////////
    public start(force: boolean = false): boolean {

        if (this.isLoading) {
            return false;
        }

        console.log('%s.start｜loadingId=', TAG, this.loadingId);

        loadingModule.updateProgress({
            id: this.loadingId,
            progress: 0,
        });

        return true;
    }

    public progress(progress: number) {
        loadingModule.updateProgress({
            id: this.loadingId,
            progress,
        });
    }

    public complete() {
        loadingModule.updateProgress({
            id: this.loadingId,
            progress: 100,
        });
    }

    public remove() {
        loadingModule.removeProgress(this.loadingId);
    }

    public updateLoadingId(loadingId: string) {
        this.loadingId = loadingId;
    }

    public async load(proc: () => Promise<boolean>): Promise<void> {
        if (!this.start()) {
            return;
        }

        if (await proc()) {
            this.complete();
        }
    }

    // Computed ////////////////////////////////////
    public get loadings(): ILoading[] {
        return loadingModule.loadings;
    }

    public get loading(): ILoading | null {
        return this.loadings.findByKey('id', this.loadingId);
    }

    public get isLoading() {
        return !!this.loading;
    }
}
