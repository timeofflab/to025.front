import {VuexModule, getModule, Action, Module, Mutation} from 'vuex-module-decorators';
import store from '@/store';
import {$v} from "@/classes/utils/var-util";

enum LoaderType {
    OfficialSplash = 'officialSplash',
    WaitSplash = 'waitSplash',
    NavLoader = 'navLoader',    //Navigation loader
    TLoader = 'tLoader',    //Transparent loader
}

export interface ILoading {
    id: string;
    progress: number;
    option?: {
        fill?: boolean,
    };
}

export interface ILoadingRequest {
    id?: string;
    progress?: number;
    option?: any;
}

// state's interface
export interface ILoadingModule {
    loadings: ILoading[];
}

@Module({dynamic: true, store, name: 'loading', namespaced: true})
class Store extends VuexModule implements ILoadingModule {

    private _loadings: ILoading[] = [];

    // Getters ////////////////////////////////////////////////////
    public get loadings(): ILoading[] {
        return this._loadings;
    }

    public get loading(): ILoading | null {
        return this.loadings.length > 0 ? this.loadings[this.loadings.length - 1] : null;
    }

    @Mutation
    public updateProgress(param: ILoadingRequest = {}) {
        const loading = {
            id: $v.path(param, 'id', '@'),
            progress: $v.num($v.p(param, 'progress')) || 0,
        };

        this._loadings = this._loadings.replaceByKey('id', loading).array;
    }

    @Mutation
    public removeProgress(id: string) {
        this._loadings = this._loadings.filter((_: ILoading) => _.id !== id);
    }
}

export const loadingModule = getModule(Store);

const M = loadingModule;
