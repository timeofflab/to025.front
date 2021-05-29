import {Mutation, MutationAction, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';
import {$v} from "@/classes/utils/var-util";
import {EnvUtil} from "~/classes/utils/env-util";

declare var grecaptcha: any;
declare var window: any;

const TAG = 'cRecaptchaV3Module';

// state's interface
export interface IRecaptchaV3Module {
    siteKey: string;
}

@Module({dynamic: true, store, name: 'cRecaptchaV3', namespaced: true})
class Store extends VuexModule implements IRecaptchaV3Module {

    private _siteKey: string | null = null;

    // Getters ////////////////////////////////////////////
    public get siteKey(): string {
        return this._siteKey || EnvUtil.GOOGLE_RECAPTCHA_SITE_KEY;
    }

    // Mutations /////////////////////////////////////////
    @Mutation
    public updateSiteKey(value: string | null) {
        this._siteKey = value;
    }

    // Actions ////////////////////////////////////////////
    @Action
    public captcha(): Promise<string> {
        const recaptcha = $v.p(window, 'grecaptcha');
        return new Promise((resolve: any, reject: any) => {
            if (!recaptcha) {
                const msg = 'recaptcha not defined';
                console.error(msg);
                reject(msg);
                return;
            }


            recaptcha.ready(() => {
                console.log('%s.captcha().ready()｜siteKey=', TAG, M.siteKey);
                recaptcha.execute(M.siteKey, {action: 'submit'}).then((token: string) => {
                    // Add your logic to submit to your backend server here.
                    resolve(token);
                });
            });
        });
    }
}

export const cRecaptchaV3Module = getModule(Store);

const M = cRecaptchaV3Module;
