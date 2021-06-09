import {Mutation, MutationAction, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';
import {Api} from "~/classes/api";
import {IApiMessage} from "~/classes/core/i";
import {ApiMessageUtil} from "~/classes/app/api/api-message-util";
import {$v} from "~/classes/utils/var-util";
import {errorModule} from "~/store/error";

const TAG = 'pageShowProject';

// state's interface
export interface IBodyModule {
    project: string;
}

@Module({dynamic: true, store, name: 'pageShowProject', namespaced: true})
class Store extends VuexModule implements IBodyModule {

    private _project: string = '';

    // Computed ////////////////////////////////////////
    public get project(): string {
        return this._project;
    }

    // Mutations ///////////////////////////////////////
    @Mutation
    public updateProject(value: string) {
        this._project = value;
    }

    // Action //////////////////////////////////////////
    @Action
    public async $get(param: any = {}): Promise<IApiMessage> {
        try {
            const res = await Api.To025c2.show
                .project
                ._user($v.p(param, 'user'))
                ._project($v.p(param, 'pj'))
                .$get({
                    query: {
                        password: $v.p(param, 'password'),
                    },
                });

            console.log('%s.$get｜res', TAG, res);

            if (!!$v.p(res, 'item')) {
                return ApiMessageUtil.success({
                    project: res.item,
                });
            } else if ($v.p(res, 'authorization')) {
                return ApiMessageUtil.success({
                    authorization: 1,
                });
            } else {
                return ApiMessageUtil.error('notFound');
            }

        } catch (e) {
            return ApiMessageUtil.error('exception', ['E'], {e});
        }
    }

    @Action
    public async $show(param: any = {}): Promise<IApiMessage> {
        try {
            const res = await Api.To025c2.show
                .project
                ._user($v.p(param, 'user'))
                ._project($v.p(param, 'pj'))
                ._token($v.p(param, 'password'))
                .$get();

            console.log('%s.$get｜res', TAG, res);

            if (!!$v.p(res, 'item')) {
                return ApiMessageUtil.success({
                    project: res.item,
                });
            } else if ($v.p(res, 'authorization')) {
                return ApiMessageUtil.success({
                    authorization: 1,
                });
            } else {
                return ApiMessageUtil.error('notFound');
            }

        } catch (e) {
            return ApiMessageUtil.error('exception', ['E'], {e});
        }
    }

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
                code: 'pageShowProject.$post',
                message: '',
                ext: {
                    e,
                },
            });

            return e;
        }
    }
}

export const pageShowProjectModule = getModule(Store);

const M = pageShowProjectModule;
