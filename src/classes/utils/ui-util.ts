import WUtil from "~/classes/view/w-util";

export class UiUtil {

    public static get isTouchDevice(): boolean {

        if (!WUtil.isBrowser) {
            return false;
        }

        return (('createTouch' in document) || ('ontouchstart' in document)) && ('orientation' in window);
    }

    public static touch<T>(cb: () => T): T | null {
        if (!self.isTouchDevice) {
            return null;
        }

        return cb();
    }

    public static async touchAsync<T>(cb: () => Promise<T>): Promise<T | null> {
        if (!self.isTouchDevice) {
            return null;
        }
        return await cb();
    }

    public static click<T>(cb: () => T): T | null {
        if (self.isTouchDevice) {
            return null;
        }

        return cb();
    }

    public static async clickAsync<T>(cb: () => Promise<T>): Promise<T | null> {
        if (self.isTouchDevice) {
            return null;
        }

        return await cb();
    }
}

const self = UiUtil;
