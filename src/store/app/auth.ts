import {Action, getModule, Module, Mutation, VuexModule} from "@/node_modules/vuex-module-decorators";
import Axios from 'axios';
import store from '@/store';
import VarUtil, {$v} from "@/classes/utils/var-util";
import {IErrorBag} from "~/store/edit";
import {Api} from "~/classes/api";

const TAG = 'appAuthModule';

export interface IAppAuth {
    project: string;
    user: {
        id: string,
        name: string,
    },
    token: string;
    loginAt: string;
    limitedAt: string;
}

export interface IAppAuthModule {
    auth: IAppAuth | null;
    errors: IErrorBag[];
}

const LS_NAME = 'appAuthModule';

@Module({dynamic: true, store, name: 'appAuth', namespaced: true})
class Store extends VuexModule implements IAppAuthModule {

    public auth: IAppAuth | null = null;
    public errors: IErrorBag[] = [];

    // Getters //////////////////////////////
    public get isAuth(): boolean {
        return !!$v.p(this.auth, 'user');
    }

    public get authUser(): IAppAuth | null {
        return $v.p(this.auth, 'user');
    }

    public get hasErrors(): boolean {
        return this.errors.length > 0;
    }

    @Mutation
    public updateAuth(value: IAppAuth | null = null) {
        this.auth = value;
    }

    @Mutation
    public updateErrors(value: IErrorBag[] = []) {
        this.errors = value;
    }

    // Actions /////////////////////
    @Action
    public async init() {
        await M.load();
        await M.hello();
    }

    @Action
    public async updateApiTokens() {
        Axios.defaults.headers = {
            ...Axios.defaults.headers,
        };
    }

    @Action
    public async login(auth: IAppAuth) {
        M.updateAuth(auth);

        console.log('%s.login() | ', TAG, M.auth);

        await M.save();
        await M.updateApiTokens();
    }

    @Action
    public async hello() {
        try {
            const res = await Api.To025c2
                .service
                .hello
                .$get();

            console.log('%s.hello｜res > ', TAG, res);

            const session = $v.p(res, 'session');
            if ($v.p(session, 'user')) {
                // M.updateAuth(session);
            } else {
                console.log('[%s] hello() failed auth clean', TAG, session);
                M.updateAuth(null);
                await M.clear();
            }
        } catch (e) {
            M.updateErrors([{
                name: 'auth',
                messages: ['auth error'],
            }]);
        }
    }

    @Action
    public async showAuth(param: {
        act?: string,
        token?: string
    } = {}): Promise<IAppAuth | null> {

        try {
            const res = await Api.To025c2
                .service
                .auth
                ._token($v.p(param, 'token'))
                .$get();

            console.log('%s.showAuth() | ', TAG, res);

            if (!!$v.p(res, 'user')) {
                console.log('%s.showAUth() | success > login', TAG);
                return res;
            } else {
                return null;
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    @Action
    public async postAuth(param: any = {}) {
        try {

            console.log('%s｜postAuth', TAG, param);

            const res = await Api.To025c2
                .service
                .auth
                .$post({
                    body: {
                        email: $v.p(param, 'email'),
                    }
                });

            console.log('[%s] response is ', URL, res);

            return true;

        } catch (e) {

            const err = $v.p(e, 'response.data.errors');
            M.updateErrors(err || [{
                name: 'loginId',
                messages: ['invalid auth'],
            }]);

            return false;
        }
    }

    @Action
    public async logout() {
        M.updateAuth();
        localStorage.clear();  //全データを消去
        //      await ManagerApi.System.logout().execAsync();
        console.log('logout()');
    }

    @Action
    public async open() {

    }

    @Action
    public async token() {

    }

    @Action
    public async load() {
        const auth = VarUtil.tap(localStorage![LS_NAME], (src: string) => {

            if (!src) {
                return null;
            }

            const auth = JSON.parse(src);
            return (!!auth['token']) ? auth : null;
        });

        console.log('[%s] load() > ', TAG, auth);

        await M.updateAuth(auth);
        await M.updateApiTokens();
    }


    @Action
    public async save() {
        localStorage![LS_NAME] = JSON.stringify(M.auth);
    }

    @Action
    public async clear() {
        localStorage.removeItem(LS_NAME);
    }
}

export const appAuthModule = getModule(Store);

const M = appAuthModule;
