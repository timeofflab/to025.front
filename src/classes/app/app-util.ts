import {EnvUtil} from "~/classes/utils/env-util";

export class AppUtil {
    /**
     * @param path
     * @param baseUrl
     */
    public static url(path: string = '/', baseUrl: string = ''): string {
        return EnvUtil.OFFICIAL_URL + baseUrl + path;
    }

    /**
     * @param path
     * @param baseUrl
     */
    public static mediaUrl(path: string = '/', baseUrl: string = ''): string {
        return EnvUtil.MEDIA_BASE + (baseUrl + path).replace(/\/+/, '/');
    }

    public static commonUrl(path: string = '/', baseUrl: string = '/common'): string {
        return self.mediaUrl(path, baseUrl);
    }

    public static imgUrl(path: string = '/', baseUrl: string = '/common/img'): string {
        return self.mediaUrl(path, baseUrl);
    }
}

const self = AppUtil;
