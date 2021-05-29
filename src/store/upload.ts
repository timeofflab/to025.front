import {Mutation, MutationAction, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import axios from 'axios';
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
    public async showUrl(param: {
        exid: string
    }): Promise<string> {
        return '';
        // try {
        //
        //     console.log('[%s.showUrl] req > ', TAG, param);
        //
        //     const api = new OfficialSponsorApi();
        //     const res = await api.showOfficialSponsorSignedUrl(param.exid, '-');
        //
        //     console.log('[%s.showUrl] res > ', TAG, $v.p(res, 'data'));
        //
        //     return $v.p(res, 'data.signedUrl');
        // } catch (e) {
        //     console.error(e);
        //     return '';
        // }
    }

    //
    // @Action
    // public async putFiles(param: {
    //     id: string,
    //     exid: string,
    // }) {
    //     try {
    //         const upload = M.uploads.findByKey('id', param.id);
    //         for (const i in upload.files) {
    //             const f = upload.files[i];
    //             const ext = f.name.split('.').last();
    //             const filename = `file-${i}.${ext}`;
    //
    //             const signedUrl = await M.showUrl({
    //                 exid: param.exid,
    //                 filename,
    //             });
    //             console.log('[%s] show url success!', TAG);
    //
    //             await M.putFile({
    //                 url: signedUrl,
    //                 file: f,
    //             });
    //             console.log('[%s] put file success!', TAG, i, filename);
    //         }
    //     } catch (e) {
    //         console.log('[%s] put error > ', TAG, e);
    //     }
    // }
    //
    // AWS S3 Put
    @Action
    public async putFile(param: {
        url: string,
        file: File,
    }) {
        try {
            const options = {
                headers: {
                    'Content-Type': param.file.type,
                },
            };
            await axios.put(param.url, param.file, options);
        } catch (e) {
            console.log('[%s] put error > ', TAG, param.file.name);
        }
    }
}

export const uploadModule = getModule(Store);

const M = uploadModule;
