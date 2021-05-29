import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';

export interface ISsrBlogParam {
}

// state's interface
export interface ISsrBlogModule {
}

@Module({stateFactory: true, name: 'ssr/blog', namespaced: true})
export default class SsrBlogModule extends VuexModule implements ISsrBlogModule {
    // Action /////////////////////////////////////////
    //@ts-ignore
    @Action
    public async fetch(param: ISsrBlogParam | null = null) {
    }
}

