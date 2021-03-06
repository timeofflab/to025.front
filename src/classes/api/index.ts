import to985 from '~/classes/api/client/to985/$api';
import to025c2 from '~/classes/api/client/to025-c2/$api';
import instagram from '~/classes/api/client/instagram/$api';
import axiosClient from '@aspida/axios';
import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {EnvUtil} from "~/classes/utils/env-util";
import {MasterConst} from "~/configs/master-const";
import {appAuthModule} from "~/store/app/auth";
import {$v} from "~/classes/utils/var-util";

const TAG = 'Api';

/**
 *
 */
export class Api {
    public static axios: NuxtAxiosInstance;

    public static get Instagram(): any {
        return Api.InstagramV10_0;
    }

    public static get InstagramV10_0(): any {
        return instagram(axiosClient(Api.axios, {
            baseURL: EnvUtil.INSTAGRAM_API_BASE,
        })).v10_0;
    }

    public static get InstagramV7_0(): any {
        return instagram(axiosClient(Api.axios, {
            baseURL: EnvUtil.INSTAGRAM_API_BASE,
        })).v7_0;
    }

    public static get To985(): any {
        return to985(axiosClient(Api.axios, {
            baseURL: EnvUtil.TO985_API_BASE,
        })).to985;
    }

    public static get To025c2(): any {

        // console.log('%s.To025c2|API_BASE=', TAG, EnvUtil.TO025_API_BASE);

        return to025c2(axiosClient(Api.axios, {
            baseURL: EnvUtil.TO025_API_BASE,
            headers: {
                [MasterConst.To025.App.Auth.UserAuthToken]: $v.p(appAuthModule.auth, 'token'),
            }
        })).to025.c2;
    }
}

