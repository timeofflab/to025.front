import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";
import {ILoading, loadingModule} from "~/store/loading";
import {$v} from "~/classes/utils/var-util";

const CN = 'LoadingFrame';

@Component
export default class LoadingFrame extends AToComponent {

    // public isFill: boolean = false;

    @Watch('loadingCompleted')
    public watchLoadingCompleted(now: ILoading | null) {
        if (!now) {
            return;
        }

        console.log('[%s] watchLoadingCompleted > remove >', CN, now.id);
        this.clear();
    }

    public async mounted() {
        this.clear();
    }

    public async destroyed() {
        this.clear();
    }

    // Methods //////////////////////////////////
    public clear() {
        if (!!this.loadingCompleted) {
            loadingModule.removeProgress(this.loadingCompleted.id);
        }
    }

    // Events /////////////////////////////////////
    public async onEndTransitionWrapper() {

    }

    // Computed ////////////////////////////////
    public get loadings(): ILoading[] {
        return loadingModule.loadings;
    }

    public get loading(): ILoading | null {
        return loadingModule.loading;
    }

    public get isFill(): boolean {
        return (!this.loading || $v.bool($v.p(this.loading, 'option.fill')));
    }

    public get loadingCompleted(): ILoading | null {
        return this.loadings.find((_: ILoading) => {
            return (_.progress === 100);
        }) || null;
    }

    public get isLoading(): boolean {
        return true;
    }

    public get classWrapper() {
        return {};
    }

    public get isActiveOLoadingFrame(): boolean {
        return true;
    }
}
