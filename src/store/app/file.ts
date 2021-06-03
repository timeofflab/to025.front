import {Mutation, MutationAction, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';
import {$v} from "~/classes/utils/var-util";
import {ErrorUtil} from "~/classes/app/error-util";
import {errorModule} from "~/store/error";
import {Api} from "~/classes/api";

const TAG = 'fileModule';

export interface IFile {
    id: string;
    purpose: string;
    file: Blob;
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
    // Shop S3 put URLwww
    @Action
    public async $get(param: {
        purpose?: string
    }): Promise<boolean> {
        try {
            const res = await Api.To025c2
                .file
                .$get();

            console.log('%s.$get｜posted', TAG, res);

            return true;
        } catch (e) {
            // errorModule.addError();
            return false;
        }
    }

    @Action
    public async $store(param: {
        targetId: string,
        purpose: any,
    }): Promise<any> {
        try {
            const res = await Api.To025c2
                .file
                .$post({
                    body: {
                        targetId: $v.p(param, 'targetId', {}),
                        purpose: $v.p(param, 'purpose', {})
                    },
                });

            console.log('%s.$store｜posted', TAG, res);

            return res;
        } catch (e) {
            // errorModule.addError();
            return null;
        }
    }

    @Action
    public async $attach(param: {
        fileId: string,
        token: string,
        file: Blob
    }): Promise<any> {
        try {
            // const body = new FormData();
            // body.append('token', $v.p(param, 'token'));
            // body.append('file', $v.p(param, 'file'));

            const res = await Api.To025c2
                .file
                ._id($v.p(param, 'fileId'))
                .attach
                .$post({
                    body: {
                        token: $v.p(param, 'token'),
                        file: $v.p(param, 'file'),
                    },
                });

            console.log('%s.$attach｜posted', TAG, res);

            return '';
        } catch (e) {
            // errorModule.addError();
            return null;
        }
    }
}

export const appFileModule = getModule(Store);

const M = appFileModule;
