import {Mutation, MutationAction, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';

// state's interface
export interface IOfficialStore {
    active: number;
    pageId: string;
    pageLayout: string;
    useNavScrollSwitch: boolean;
    isNavScrollSwitch: boolean;
}

@Module({dynamic: true, store, name: 'official', namespaced: true})
class Official extends VuexModule implements IOfficialStore {

    public active: number = 1;
    public pageId: string = 'home';
    public pageLayout: string = 'half';
    public useNavScrollSwitch: boolean = false;
    public isNavScrollSwitch: boolean = false;


// Mutations ///////////////////////////////
    @Mutation
    public updateActive(value: any) {
        this.active = value;
    }

    @Mutation
    public updateActiveDown(value: any) {
        if (this.active > value) {
            this.active = value;
        }
    }

    @Mutation
    public updatePageId(value: string) {
        this.pageId = value;
    }

    @Mutation
    public updatePageLayout(value: string) {
        this.pageLayout = value;
    }

    @Mutation
    public updateUseNavScrollSwitch(value: any) {
        this.useNavScrollSwitch = value;
    }

    @Mutation
    public updateIsNavScrollSwitch(value: any) {
        this.isNavScrollSwitch = value;
    }

}

export const officialModule = getModule(Official);

