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

    @Action
    public async $post(param: any = {}) {
        try {

            console.log('%s｜postProject', TAG, param);

            const res = await Api.To025c2
                .service
                .Project
                .$post({
                    body: {
                        email: $v.p(param, 'email'),
                    }
                });

            console.log('[%s] response is ', URL, res);

            return true;

        } catch (e) {

            const err = $v.p(e, 'response.data.errors');
            errorModule.updateError(err || [{
                name: 'loginId',
                messages: ['invalid Project'],
            }]);

            return e;
        }
    }

    @Action
    public async $put(param: any = {
        record: null as any,
    }) {
        try {

            const id = $v.p(param, 'record.id');
            if (!id) {
                console.log('%s.$put｜id blank', TAG, id);
                return;
            }

            console.log('%s｜put project', TAG, param);

            const res = await Api.To025c2
                .presentation
                .project
                ._id(id)
                .$put({
                    body: {
                        item: $v.p(param, 'record.ex.item'),
                    },
                });

            console.log('[%s] response is ', URL, res);

            return true;

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
