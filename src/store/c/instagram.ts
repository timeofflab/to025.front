import {Mutation, MutationAction, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';
import {Api} from "~/classes/api";
import {$v} from "~/classes/utils/var-util";
import WUtil from "~/classes/view/w-util";

const TAG = 'cInstagramModule';

export interface IInstagramRequest {
    businessId: string;
    accessToken: string;
    fields: string;
}

export interface IInstagramMediaResponse {
    data: InstagramMediaPost[];
    paging: IInstagramMediaPaging;
}

export interface IInstagramMediaPaging {
    paging?: {
        before?: string;
        after?: string;
    },
    next?: string;
}

export interface InstagramMediaPost {
    id?: string;
    caption?: string;
    link_count?: number;
    media_url?: string;
    permalink?: string;
    timestamp?: string;
    username?: string;
    comments_count?: string;
}

// state's interface
export interface IInstagramModule {
    loaded: boolean;
    paging: IInstagramMediaPaging | null;
    posts: InstagramMediaPost[];
}

@Module({dynamic: true, store, name: 'cInstagram', namespaced: true})
class Store extends VuexModule implements IInstagramModule {
    private _loaded: boolean = false;
    private _paging: IInstagramMediaPaging | null = null;
    private _posts: InstagramMediaPost[] = [];

    // Getters ////////////////////////////////////////////
    public get loaded(): boolean {
        return this._loaded;
    }

    public get paging(): IInstagramMediaPaging | null {
        return this._paging;
    }

    public get posts(): any[] {
        return this._posts;
    }

// Mutations /////////////////////////////////////////
    @Mutation
    public updateLoaded(value: boolean) {
        this._loaded = value;
    }

    @Mutation
    public updatePaging(value: IInstagramMediaPaging | null) {
        this._paging = value;
    }

    @Mutation
    public updatePosts(value: InstagramMediaPost[]) {
        this._posts = value;
    }

    // Actions ////////////////////////////////////////////
    @Action
    public async $get(param: {
        businessId: string,
        fields: string,
        accessToken: string,
    }): Promise<any> {

        if (WUtil.isBrowser) {
            // Browserでは動かない
            console.error('%s.$get()｜Instagram API is SSR only');
            return false;
        }

        M.updateLoaded(true);

        try {
            const res = await Api.Instagram
                ._businessId($v.p(param, 'businessId'))
                .$get({
                    query: {
                        fields: $v.p(param, 'fields', '').trim(),
                        access_token: $v.p(param, 'accessToken')
                    },
                });

            const feeds = $v.p(res, 'media.data');
            if (!!feeds && Array.isArray(feeds)) {
                // console.log('success', feeds);

                M.updatePaging($v.p(res, 'media.paging'));
                M.updatePosts(feeds);

            } else {
                console.error('$get failed', res);
            }

            return null;

        } catch (e) {
            return e;
        }
    }
}

export const cInstagramModule = getModule(Store);

const M = cInstagramModule;
