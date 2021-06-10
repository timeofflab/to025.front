import {Action, getModule, Module, Mutation, VuexModule} from "@/node_modules/vuex-module-decorators";
import store from '@/store';
import VarUtil, {$v} from "@/classes/utils/var-util";
import {Api} from "~/classes/api";
import {errorModule} from "~/store/error";

const TAG = 'appProjectShowModule';

export interface IAppProject {
}

export interface IAppProjectShowModule {
    authorization: boolean;
    record: IAppProject | null;
}

const LS_NAME = 'appProjectShowModule';

@Module({dynamic: true, store, name: 'appProjectShow', namespaced: true})
class Store extends VuexModule implements IAppProjectShowModule {

    private _authorizeation: boolean = false;
    private _record: IAppProject | null = null;

    // Getters //////////////////////////////
    public get authorization(): boolean {
        return this._authorizeation;
    }

    public get record(): IAppProject | null {
        return this._record;
    }

    // Mutations ////////////////////////////////
    @Mutation
    public updateAuthorization(value: boolean) {
        this._authorizeation = value;
    }

    @Mutation
    public updateRecord(value: IAppProject | null) {
        this._record = value;
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
                M.updateRecord(res);
                return res;
            } else {
                return null;
            }
        } catch (e) {

            const err = $v.p(e, 'response.data.errors');
            errorModule.updateError(err || [{
                name: 'loginId',
                messages: ['invalid ProjectShow'],
            }]);

            return e;
        }
    }
}

export const appProjectShowModule = getModule(Store);

const M = appProjectShowModule;
