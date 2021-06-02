import {Mutation, MutationAction, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';

const TAG = 'uploadModule';

export interface IUpload {
    id: string;
    files: File[];
}

// state's interface
export interface IUploadModule {
    uploads: IUpload[];
}

@Module({dynamic: true, store, name: 'upload', namespaced: true})
class Store extends VuexModule implements IUploadModule {
    private _uploads: IUpload[] = [];

    // Getters ////////////////////////////////////////////
    public get uploads(): IUpload[] {
        return this._uploads;
    }

    // Mutations ////////////////////////////////////////////
    @Mutation
    public updateUploads(value: IUpload[]) {
        this._uploads = value;
    }

    @Mutation
    public updateUpload(value: IUpload) {
        this._uploads = this._uploads.replaceByKey('id', value).array;
    }

    // Actions //////////////////////////////////////////////
    // Shop S3 put URL
    @Action
    public async $get(param: {
        exid: string
    }): Promise<string> {
        return '';
    }

    @Action
    public async $post(param: {
        exid: string
    }): Promise<string> {
        return '';
    }

    @Action
    public async $attach(param: {
        exid: string
    }): Promise<string> {
        return '';
    }
}

export const uploadModule = getModule(Store);

const M = uploadModule;
