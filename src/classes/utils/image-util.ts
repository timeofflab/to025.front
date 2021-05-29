import {IResizerRequest} from "@/classes/core/module/image/i-resizer-request";
import {Env} from "@/classes/app/env";
import {$v} from "~/classes/utils/var-util";

declare var window: any;

export default class ImageUtil {

    public static src(src: string): string {
        if (/^http(s)?\/\//.test(src)) {
            return src;
        } else {
            return Env.MEDIA_BASE.replace(/\/+$/, '') + src;
        }
    }

    /**
     *
     * @param mimeType
     */
    public static isImage(mimeType: string): boolean {
        return /image\//.test(mimeType);
    }

    /**
     * MimeTypeを取得
     * @param dataURI
     */
    public static getMimeTypeByDataURI(dataURI: string): string | null {

        if (!$v.isString(dataURI)) {
            return null;
        }

        const matched = dataURI.match(/^data:([a-z\/]+);/);

        //console.log('match: ', matched);
        return (matched && matched.length > 1) ? matched[1] : null;
    }

    public static toDataURI(buffer: any): Promise<string> {
        return new Promise((resolve: any, reject: any) => {
            if (buffer instanceof Blob) {
                const fileReader = new FileReader();
                fileReader.onload = async (e: any) => {
                    resolve(e.target.result);
                };
                fileReader.readAsDataURL(buffer);
            } else {
                window.URL.createObjectURL(buffer);
                resolve('');
            }
        });
    }

    /**
     * 画像のリサイズ
     *
     */
    public static resize(request: IResizerRequest): Promise<File> {
        const {
            file,
            sizeLimit,
            quality,
        } = request;

        return new Promise(((resolve: any, reject: any) => {
            const fileReader = new FileReader();
            fileReader.onload = async (e: any) => {

                let img = new Image();
                img.onload = async () => {

                    console.log('img is w=%s, h=%s', img.height, img.width);

                    let resize = false;
                    let width = img.width;
                    let height = img.height;

                    if (sizeLimit) {
                        if (width >= height) {
                            if (width > sizeLimit) {
                                height = Math.round(height * sizeLimit / width);
                                width = Number(sizeLimit);
                                resize = true;
                            }
                        } else {
                            if (height > sizeLimit) {
                                width = Math.round(width * sizeLimit / height);
                                height = Number(sizeLimit);
                                resize = true;
                            }
                        }
                    }

                    if (!resize) {
                        // リサイズしない
                        resolve(file);
                    } else {
                        // する
                        let canvas = document.createElement('canvas');
                        canvas.width = width;
                        canvas.height = height;
                        let ctx = canvas.getContext('2d');

                        if (!ctx) {
                            return;
                        }

                        ctx.drawImage(img, 0, 0, Number(width), Number(height));
                        ctx.canvas.toBlob((blob: Blob | null) => {
                            const imageFile = new File([blob!], file!.name, {
                                type: file!.type,
                                lastModified: Date.now()
                            });
                            resolve(imageFile);
                        }, file!.type, quality || 1);
                    }
                };
                img.src = e.target.result;
            };

            // ファイルをData URIとして読み込む
            fileReader.readAsDataURL(file!);
        }));
    }

    public static b642File(base64: string, fileName: string, type: string = 'image/jpeg'): File {
        // base64のデコード
        const bin = atob(base64.replace(/^.*,/, ''));
        // バイナリデータ化
        const buffer = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) {
            buffer[i] = bin.charCodeAt(i);
        }

        // ファイルオブジェクト生成(この例ではjpegファイル)
        return new File([buffer.buffer], fileName, {type});
    }
}
