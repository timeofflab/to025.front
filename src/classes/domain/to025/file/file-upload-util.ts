import {appFileModule} from "~/store/app/file";
import {$v} from "~/classes/utils/var-util";
import {IUpload, uploadModule} from "~/store/upload";

const TAG = 'FileUploadUtil';

export class FileUploadUtil {

    public static isUpload(page: string): boolean {
        return !!appFileModule.files.findByKey('purpose', page);
    }

    public static async upload(upload: IUpload) {

        console.log('%s.upload｜', TAG, {
            upload
        });

        if (!upload) {
            console.log('%s.upload｜no upload', TAG);
            return;
        }

        const upfile = upload.files[0] as File | null;
        console.log('%s.upload｜r2/upload', TAG, {
            upfile,
        });

        if (!upfile) {
            console.log('%s.upload｜upfile is null');
            return;
        }

        const ext = (upload.files[0] as File).name
            .split('.')
            .reverse()[0].toLocaleLowerCase();

        // ファイル登録を予約｜トークン発行
        const file = await appFileModule.$store({
            targetId: $v.p(upload, 'targetId'),
            purpose: $v.p(upload, 'purpose'),
            option: {
                ...$v.p(upload, 'option', {}) || {},
                ...{
                    ext,
                },
            }
        });

        console.log('%s.upload｜r3/file', TAG, {
            file,
        });

        if (!file) {
            console.error('file attach request error');
            return;
        }

        // トークンを用いてファイルを登録
        await appFileModule.$attach({
            fileId: $v.p(file, 'id'),
            token: $v.p(file, 'ex.upload.token'),
            file: upload.files[0],
        });

        // アップロードをRemove
        await uploadModule.removeUpload(upload.id);
    }
}

const self = FileUploadUtil;
