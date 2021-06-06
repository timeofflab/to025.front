import {MasterConst} from "~/configs/master-const";
import {EnvUtil} from "~/classes/utils/env-util";

const TAG = 'AccessUtil';

export class AccessUtil {
    public static path(path: string): string {
        const base = EnvUtil.TO025_UP_FILE_BASE.replace(/^\/$/, '');
        const rpath = ((MasterConst.To025.App.File.Base + '/' + path)
            .replace(/\/\/+/, '/'));

        // console.log('%s.path｜', TAG, {base, rpath});
        return (base + rpath).replace(/([^:])\/\/+/, '$1/');
    }
}
