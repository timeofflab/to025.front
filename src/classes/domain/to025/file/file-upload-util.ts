import {appFileModule} from "~/store/app/file";
import {$v} from "~/classes/utils/var-util";
import {uploadModule} from "~/store/upload";

const TAG = 'FileUploadUtil';

export class FileUploadUtil {

    public static purpose: string = 'presentation/page';

    public static isUpload(page: string): boolean {
        return !!appFileModule.files.findByKey('purpose', self.purpose + page);
    }

    public static async upload(uploadId: string, targetId: string, purpose: string) {

        const upload = uploadModule.uploads.findByKey('id', uploadId);
        console.log('%s.upload｜', TAG, {
            upload, uploadId
        });

        if (!upload) {
            console.log('%s.upload｜no upload', TAG);
            return;
        }

        console.log('%s.upload｜r2/upload', TAG, {
            upfile: upload.files[0],
        });

        // ファイル登録を予約｜トークン発行
        const file = await appFileModule.$store({
            targetId,
            purpose,

        });

        console.log('%s.upload｜r3/file', TAG, {
            file,
        });

        // トークンを用いてファイルを登録
        await appFileModule.$attach({
            fileId: $v.p(file, 'id'),
            token: $v.p(file, 'ex.upload.token'),
            file: upload.files[0],
        });
    }
}

const self = FileUploadUtil;
