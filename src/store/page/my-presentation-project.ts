import {Mutation, MutationAction, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';
import {Api} from "~/classes/api";
import {IApiMessage} from "~/classes/core/i";
import {ApiMessageUtil} from "~/classes/app/api/api-message-util";
import {$v} from "~/classes/utils/var-util";
import {errorModule} from "~/store/error";

const TAG = 'pageContact';

export interface IBodyClickEvent {
}

// state's interface
export interface IBodyModule {
    currentProject: string;
    currentPage: string;
}

@Module({dynamic: true, store, name: 'pageMyPresentationProject', namespaced: true})
class Store extends VuexModule implements IBodyModule {

    private _currentProject: string = '';
    private _currentPage: string = '';

    // Computed ////////////////////////////////////////
    public get currentProject(): string {
        return this._currentProject;
    }

    public get currentPage(): string {
        return this._currentPage;
    }

// Mutations ///////////////////////////////////////
    @Mutation
    public updateCurrentProject(value: string) {
        this._currentProject = value;
    }

    @Mutation
    public updateCurrentPage(value: string) {
        this._currentPage = value;
    }

// Action //////////////////////////////////////////
    @Action
    public async $post(param: any): Promise<IApiMessage> {
        try {
            const res = await Api.To985
                ._siteCd($v.p(param, 'siteCd'))
                .contact
                .$post({
                    body: param.body,
                });

            console.log('%s.$post', TAG, res);

            return ApiMessageUtil.success();

        } catch (e) {
            console.log('%s.$post', TAG, e.response.data);

            errorModule.addError({
                code: 'pageMyPresentationProject.$post',
                message: '',
                ext: {
                    e,
                },
            });

            return e;
        }
    }
}

export const pageMyPresentationProjectModule = getModule(Store);

const M = pageMyPresentationProjectModule;
