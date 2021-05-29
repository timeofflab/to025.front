import {Mutation, MutationAction, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';
import {Project} from '@/configs/project';

// state's interface
export interface IPreviewStore {

	active: number;
	loading: boolean;
	loaded: boolean;
	fullscreen: boolean;

}

@Module({dynamic: true, store, name: 'preview', namespaced: true})
class Preview extends VuexModule implements IPreviewStore {


	public active: number = 0;
	public loading: boolean = true;
	public loaded: boolean = false;
	public fullscreen: boolean = false;

    @Mutation
    public updateActive(value: any) {
        this.active = value;
    }

    @Mutation
    public updateLoading(value: any) {
        this.loading = value;
    }

    @Mutation
    public updateLoaded(value: any) {
        this.loaded = value;
    }

    @Mutation
    public updateFullscreen(value: any) {
        this.fullscreen = value;
    }

}

export const previewModule = getModule(Preview);

