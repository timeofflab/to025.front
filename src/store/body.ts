import {Mutation, MutationAction, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';

export interface IBodyClickEvent {
    id: string;
    seq: number;
    option?: any;
}

// state's interface
export interface IBodyModule {
    scrollTop: number;
    scrollIsDown: boolean;
    bodyClickEventSeq: number;
}

@Module({dynamic: true, store, name: 'body', namespaced: true})
class Store extends VuexModule implements IBodyModule {

    public scrollTop: number = 0;
    public scrollIsDown: boolean = true;
    public bodyClickEventSeq: number = 1;

    // Computed ////////////////////////////////////////

    @Mutation
    public updateScrollTop(value: number) {
        this.scrollTop = value;
    }

    @Mutation
    public updateScrollIsDown(value: boolean) {
        this.scrollIsDown = value;
    }

    @Mutation
    public incBodyClickEventSeq() {
        this.bodyClickEventSeq = (this.bodyClickEventSeq + 1);
    }
}

export const bodyModule = getModule(Store);

const M = bodyModule;
