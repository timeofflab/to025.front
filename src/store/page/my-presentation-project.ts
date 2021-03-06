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
    page: number;
    pageItem: any;
}

@Module({dynamic: true, store, name: 'pageMyPresentationProject', namespaced: true})
class Store extends VuexModule implements IBodyModule {

    private _project: string = '';
    private _record: any = null;
    private _page: number = 0;
    private _pageItem: any = null;

    // Computed ////////////////////////////////////////
    public get project(): string {
        return this._project;
    }

    public get record(): string {
        return this._record;
    }

    public get page(): number {
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
    public updatePage(value: number) {
        this._page = value;
    }

    @Mutation
    public updatePageItem(value: any) {
        this._pageItem = value;
    }

// Action //////////////////////////////////////////
    @Action
    public async $post(param: any = {}): Promise<IApiMessage> {
        try {
            const res = await Api.To025c2
                .presentation
                .project
                .$post({
                    body: {},
                });

            console.log('%s.$post', TAG, res);

            return ApiMessageUtil.success({
                record: res,
            });

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

    @Action
    public async $put(param: any = {
        record: null as any,
    }) {
        try {

            const id = $v.p(param, 'record.id');
            if (!id) {
                console.log('%s.$put???id blank', TAG, id);
                return;
            }

            console.log('%s???put project', TAG, param);

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

    @Action
    public async $delete(id: string): Promise<IApiMessage> {
        try {
            const res = await Api.To025c2
                .presentation
                .project
                ._id(id)
                .$delete({
                    body: {},
                });

            console.log('%s.$delete', TAG, res);

            return ApiMessageUtil.success();

        } catch (e) {
            console.log('%s.$delete', TAG, e.response.data);

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
