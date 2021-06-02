import {appFileModule} from "~/store/app/file";

export class FileUploadUtil {

    public static purpose: string = 'presentation/page/';

    public static isUpload(page: string): boolean {
        return !!appFileModule.files.findByKey('purpose', self.purpose + page);
    }

    public static async upload(page: string) {
        const purpose = self.purpose + page;
        const file = appFileModule.files.findByKey('purpose', purpose);

        if (!file) {
            return;
        }

        // ファイル登録を予約｜トークン発行
        const token = await appFileModule.$post({purpose});
        // トークンを用いてファイルを登録
        await appFileModule.$attach({
            token,
            file,
        });
    }
}

const self = FileUploadUtil;
