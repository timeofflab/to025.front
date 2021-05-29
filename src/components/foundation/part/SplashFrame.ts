import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";
import {ILoading, loadingModule} from "~/store/loading";
import {appModule} from "~/store/app";
import WUtil from "~/classes/view/w-util";
import {MasterConst} from "~/configs/master-const";

const TAG = 'SplashFrame';

@Component
export default class SplashFrame extends AToComponent {

    public state = {
        view: {
            ready: false,
        },
    };
    public dateToday: string = 'Dat Month Year';

    @Watch('loadingCompleted')
    public watchLoadingCompleted(now: ILoading | null) {
        if (!now) {
            return;
        }

        console.log('[%s] watchLoadingCompleted > remove >', TAG, now.id);
        loadingModule.removeProgress(now.id);
    }

    // Init ////////////////////////////////////////////////////////////
    public async mounted() {
        console.log('[%s] mounted > ', TAG, this.deviceSize);
        if (WUtil.isBrowser) {
            window.setTimeout(() => {
                this.state.view.ready = true;
                console.log('[%s] mounted > f2 > ', TAG, this.deviceSize);
            }, 100);
        }

        this.dateToday = this.formattedDate();
    }


    // Methods ////////////////////////////////////////////////////////////
    public formattedDate(): string {
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        let current_datetime = new Date();
        let formatted_date = current_datetime.getDate() + ' ' + months[current_datetime.getMonth()] + ' ' + current_datetime.getFullYear()
        //console.log(formatted_date)
        return formatted_date;
    }

    // Computeds /////////////////////////////////////////////////////////
    public get isReady(): boolean {
        return this.state.view.ready;
    }

    public get loadings(): ILoading[] {
        return loadingModule.loadings;
    }

    public get loadingCompleted(): ILoading | null {
        return this.loadings.find((_: ILoading) => {
            return (_.progress === 100);
        }) || null;
    }

    public get deviceSize(): any {
        return appModule.deviceSize;
    }

    public get appVersion(): string {
        return MasterConst.App.Version;
    }
}
