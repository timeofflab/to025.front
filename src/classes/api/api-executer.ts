import axios from 'axios';
import {sprintf} from 'sprintf-js';

enum ApiMethod {
    Get,
    Show,
    Post,
    Patch,
    Delete,
}


export default class ApiExecuter {

    /**
     *
     * @param url
     * @param data
     */
    public static entryPoint(url: string, data: number | string): string {
        return sprintf('%s/%s', url, data);
    }

    /**
     *
     * @param method
     * @param url
     * @param params
     */
    public static async exec(method: ApiMethod, url: string, params: any = null): Promise<any> {

        switch (method) {
            case ApiMethod.Get:
            case ApiMethod.Show:
                return await axios.get(url, params);
            case ApiMethod.Post:
                return await axios.post(url, params);
            case ApiMethod.Patch:
                return await axios.patch(url, params);
            case ApiMethod.Delete:
                return await axios.delete(url, params);
            default:
                throw new Error('Method Error > ' + method);
        }
    }

    public static async get(url: string, params: any = null): Promise<any> {
        return ApiExecuter.exec(ApiMethod.Get, url, params);
    }

    public static async show(url: string, id: string | number, params: any = null): Promise<any> {
        return ApiExecuter.exec(ApiMethod.Get, ApiExecuter.entryPoint(url, id), params);
    }

    public static async store(url: string, id: string | number | null, params: any): Promise<any> {
        return (!!id) ? ApiExecuter.patch(url, id, params)
            : ApiExecuter.post(url, params);
    }

    public static async post(url: string, params: any): Promise<any> {
        return ApiExecuter.exec(ApiMethod.Post, url, params);
    }

    public static async patch(url: string, id: string | number, params: any): Promise<any> {
        return ApiExecuter.exec(ApiMethod.Patch, ApiExecuter.entryPoint(url, id), params);
    }

    public static async delete(url: string, id: string | number, params: any = null): Promise<any> {
        return ApiExecuter.exec(ApiMethod.Delete, ApiExecuter.entryPoint(url, id), params);
    }
}

