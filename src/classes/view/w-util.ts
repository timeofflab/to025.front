declare var process: any;
export default class WUtil {

    static window: Window;

    public static get isBrowser(): boolean {
        return process.browser;
    }

    /**
     * 初期化
     */
    public static init() {
        WUtil.browser(() => {
            WUtil.window = window;
        })
    }

    /**
     * ブラウザの場合に処理
     * @param proc
     */
    public static browser(proc: () => void) {
        if (WUtil.isBrowser) {
            proc();
        }
    }

    /**
     * ブラウザの場合にPromise
     * @param proc
     */
    public static async browserAsync(proc: () => Promise<void>): Promise<void> {
        if (WUtil.isBrowser) {
            await proc();
        }
    }

    /**
     *
     * @param value
     * @param vname
     */
    public static export(value: any, vname: string) {
        WUtil.browser(() => {
            (WUtil.window as any)[vname] = value;
        });
    }
}
