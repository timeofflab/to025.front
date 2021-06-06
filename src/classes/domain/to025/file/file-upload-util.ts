import {appFileModule} from "~/store/app/file";
import {$v} from "~/classes/utils/var-util";
import {uploadModule} from "~/store/upload";

const TAG = 'FileUploadUtil';

export class FileUploadUtil {

    public static isUpload(page: string): boolean {
        return !!appFileModule.files.findByKey('purpose', page);
    }

    public static async upload(uploadId: string, targetId: string, purpose: string, option: any = {}) {

        const upload = uploadModule.uploads.findByKey('id', uploadId);
        console.log('%s.upload｜', TAG, {
            upload, uploadId
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
            targetId,
            purpose,
            option: {
                ...option,
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
        await uploadModule.removeUpload(uploadId);
    }
}

const self = FileUploadUtil;
