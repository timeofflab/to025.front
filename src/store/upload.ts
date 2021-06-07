import {Mutation, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';

const TAG = 'uploadModule';

export interface IUpload {
    id: string;
    group: string; // 任意
    purpose: number | string;
    targetId: string;
    files: Blob[];
    option?: any;
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
    public clear() {
        this._uploads = [];
    }

    @Mutation
    public updateUploads(value: IUpload[]) {
        this._uploads = value;
    }

    @Mutation
    public updateUpload(value: IUpload) {
        this._uploads = this._uploads.replaceByKey('id', value).array;
    }

    @Mutation
    public updateUploadByPurpose(value: IUpload) {
        this._uploads = this._uploads.replaceByKey('purpose', value).array;
    }

    @Mutation
    public removeUpload(value: string) {
        this._uploads = this._uploads.rejectByKey('id', value);
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
