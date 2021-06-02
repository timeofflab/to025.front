import {Mutation, MutationAction, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';

const TAG = 'fileModule';

export interface IFile {
    id: string;
    purpose: string;
    file: File;
}

// state's interface
export interface IAppFileModule {
    files: IFile[];
}

@Module({dynamic: true, store, name: 'appFile', namespaced: true})
class Store extends VuexModule implements IAppFileModule {
    private _files: IFile[] = [];

    // Getters ////////////////////////////////////////////
    public get files(): IFile[] {
        return this._files;
    }

    // Mutations ////////////////////////////////////////////
    @Mutation
    public updateFiles(value: IFile[]) {
        this._files = value;
    }

    @Mutation
    public updateFile(value: IFile) {
        this._files = this._files.replaceByKey('id', value).array;
    }

    // Actions //////////////////////////////////////////////
    // Shop S3 put URL
    @Action
    public async $get(param: {
        id?: string
        purpose?: string
    }): Promise<string> {
        return '';
    }

    @Action
    public async $post(param: {
        id?: string
        purpose?: string
    }): Promise<string> {
        return '';
    }

    @Action
    public async $attach(param: {
        token: string,
        file: IFile
    }): Promise<string> {
        return '';
    }
}

export const appFileModule = getModule(Store);

const M = appFileModule;
