import {EnvUtil} from "~/classes/utils/env-util";
import {AppMode} from "~/configs/master-const";

export class AppModeUtil {
    public static isProduction(): boolean {
        return EnvUtil.APP_MODE === AppMode.Production;
    }

    public static isDevelop(): boolean {
        return EnvUtil.APP_MODE === AppMode.Develop;
    }
}
