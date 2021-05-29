import {Mutation, MutationAction, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';
import {Api} from "~/classes/api";
import {IApiMessage} from "~/classes/core/i";
import {ApiMessageUtil} from "~/classes/app/api/api-message-util";
import {To985ValidatorUtil} from "~/classes/domain/to985/to985-validator-util";
import {$v} from "~/classes/utils/var-util";

const TAG = 'pageContact';

export interface IBodyClickEvent {
}

// state's interface
export interface IBodyModule {
    contactCode: string;
}

@Module({dynamic: true, store, name: 'pageServiceContact', namespaced: true})
class Store extends VuexModule implements IBodyModule {

    private _contactCode: string = '';

    // Computed ////////////////////////////////////////
    public get contactCode(): string {
        return this._contactCode;
    }

    // Mutations ///////////////////////////////////////
    @Mutation
    public updateContactCode(value: string = '') {
        this._contactCode = value;
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

            M.updateContactCode($v.p(res, 'contactCode'));

            return ApiMessageUtil.success();

        } catch (e) {
            console.log('%s.$post', TAG, e.response.data);
            return To985ValidatorUtil.validError(e);
        }
    }
}

export const pageServiceContactModule = getModule(Store);

const M = pageServiceContactModule;
