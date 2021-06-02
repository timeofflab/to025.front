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
    project: string;
    record: any;
    page: string;
    pageItem: any;
}

@Module({dynamic: true, store, name: 'pageMyPresentationProject', namespaced: true})
class Store extends VuexModule implements IBodyModule {

    private _project: string = '';
    private _record: any = null;
    private _page: string = '';
    private _pageItem: any = null;

    // Computed ////////////////////////////////////////
    public get project(): string {
        return this._project;
    }

    public get record(): string {
        return this._record;
    }

    public get page(): string {
        return this._page;
    }

    public get pageItem(): any {
        return this._pageItem;
    }

// Mutations ///////////////////////////////////////
    @Mutation
    public updateProject(value: string) {
        this._project = value;
    }

    @Mutation
    public updateRecord(value: any) {
        this._record = value;
    }

    @Mutation
    public updatePage(value: string) {
        this._page = value;
    }

    @Mutation
    public updatePageItem(value: any) {
        this._pageItem = value;
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
