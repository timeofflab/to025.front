import {Mutation, MutationAction, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';

// state's interface
export interface IScroll {
    id: string;
    scrollTop: number;
    scrollIsDown?: boolean;
}

export interface IScrollModule {
    scrolls: IScroll[];
}

@Module({dynamic: true, store, name: 'scroll', namespaced: true})
class Store extends VuexModule implements IScrollModule {

    private _scrolls: IScroll[] = [];

    // Getters ///////////////////////////////////////////
    public get scrolls(): IScroll[] {
        return this._scrolls;
    }

    // Mutations ////////////////////////////////////////////
    @Mutation
    public updateScroll(value: IScroll) {
        const current = this._scrolls.findByKey('id', value.id);
        const currentTop = !!current ? current.scrollTop : 0;
        const scrollIsDown = currentTop < value.scrollTop;

        this._scrolls = this._scrolls.replaceByKey('id', {
            ...value,
            ...{
                scrollIsDown,
            }
        }).array;
    }

    @Mutation
    public updateScrolls(value: IScroll[]) {
        this._scrolls = value;
    }

    @Mutation
    public clear(id: string) {
        M.updateScroll({
            id,
            scrollTop: -10001,
        });
    }

    // Actions //////////////////////////////////////////////
}

export const scrollModule = getModule(Store);

const M = scrollModule;
