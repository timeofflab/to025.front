import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import axios from "axios";
import {EnvUtil} from "~/classes/utils/env-util";
import {Api} from "~/classes/api";
import {$v} from "~/classes/utils/var-util";

const TAG = 'to985Module';
const LS_KEY = 'to985';

// state's interface
export interface ITo985Module {
    debug: boolean;
    iframe: boolean;
    token: string;
    recaptchaV3SiteKey: string;
}

@Module({dynamic: true, store, name: 'to985', namespaced: true})
class Store extends VuexModule implements ITo985Module {

    private _debug: boolean = false;
    private _iframe: boolean = false;
    private _token: string = '';
    private _recaptchaV3SiteKey = '';

    // Computed //////////////////////////////////////////////////////////
    public get debug(): boolean {
        return this._debug;
    }

    public get iframe(): boolean {
        return this._iframe;
    }

    public get token(): string {
        return this._token;
    }

    public get recaptchaV3SiteKey(): string {
        return this._recaptchaV3SiteKey;
    }

    // Mutations //////////////////////////////////////////////////////////
    @Mutation
    public updateDebug(value: boolean) {
        this._debug = value;
    }

    @Mutation
    public updateIframe(value: boolean) {
        this._iframe = value;
    }

    @Mutation
    public updateToken(value: string) {
        this._token = value;
    }

    @Mutation
    public updateRecaptchaV3SiteKey(value: string) {
        this._recaptchaV3SiteKey = value;
    }

// Actions ////////////////////////////////////////////////////////////
    @Action
    public async $init(param: any): Promise<any> {
        try {
            console.log('%s.$init', TAG, param);
            const res = await Api.To985
                ._siteCd($v.p(param, 'siteCd', '---'))
                .contact
                .$get({
                    query: (() => {
                        const debug = $v.p(param, 'debug', '');
                        return $v.isEmpty(debug) ? null : {
                            debug,
                        };
                    })(),
                    headers: {
                        'X-To985-Secret': param.secret,
                    },
                });
            console.log('%s.$prepareSSR', TAG, res);
            return res;
        } catch (e) {
            console.log('%s.$prepareSSR｜E', TAG, e);
            return '';
        }
    }

    @Action
    public async $get() {
        try {
            const siteCd = EnvUtil.TO985_SITE_CD;
            const token = M.token;
            const res = await axios.get(EnvUtil.API_BASE_URL + `/to985/${siteCd}/contact`, {
                headers: {
                    'X-To985-Token': token,
                }
            });
            console.log('%s.$get｜res.data', TAG, res.data);
        } catch (e) {
            console.log('%s.$get｜', TAG, e);
        }
    }
}

export const to985Module = getModule(Store);

const M = to985Module;
