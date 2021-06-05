import {Action, getModule, Module, Mutation, VuexModule} from "@/node_modules/vuex-module-decorators";
import store from '@/store';
import VarUtil, {$v} from "@/classes/utils/var-util";
import {Api} from "~/classes/api";
import {errorModule} from "~/store/error";

const TAG = 'appProjectModule';

export interface IAppProject {
    project: string;
    user: {
        id: string,
        name: string,
    },
    token: string;
    loginAt: string;
    limitedAt: string;
}

export interface IAppProjectModule {
    records: IAppProject[]
}

const LS_NAME = 'appProjectModule';

@Module({dynamic: true, store, name: 'appProject', namespaced: true})
class Store extends VuexModule implements IAppProjectModule {

    private _records: IAppProject[] = [];

    // Getters //////////////////////////////
    public get records(): IAppProject[] {
        return this._records;
    }

    // Mutations ////////////////////////////////
    @Mutation
    public updateRecords(value: IAppProject[]) {
        this._records = value;
    }

    @Mutation
    public updateRecord(value: IAppProject) {
        this._records = this._records.replaceByKey('id', value).array;
    }

    @Mutation
    public removeRecord(id: string) {
        this._records = this._records.rejectByKey('id', id);
    }

    // Actions /////////////////////
    @Action
    public async $get(param: {
        act?: string,
        token?: string
    } = {}): Promise<IAppProject | null> {

        try {
            const res = await Api.To025c2
                .presentation
                .project
                .$get();

            console.log('%s.$get() | ', TAG, res);

            if ($v.isArray(res)) {
                M.updateRecords(res);
                return res;
            } else {
                return null;
            }
        } catch (e) {

            const err = $v.p(e, 'response.data.errors');
            errorModule.updateError(err || [{
                name: 'loginId',
                messages: ['invalid Project'],
            }]);

            return e;
        }
    }

}

export const appProjectModule = getModule(Store);

const M = appProjectModule;
