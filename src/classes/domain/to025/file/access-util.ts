import {MasterConst} from "~/configs/master-const";

export class AccessUtil {
    public static path(path: string): string {
        return (MasterConst.To025.App.File.Base + '/' + path).replace(/\/+/, '/');
    }
}
