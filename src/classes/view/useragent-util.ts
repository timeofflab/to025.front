export default class UseragentUtil {

    /*
        OSを返す
        os: windows, ios, mac, android

        使用例
        themeMainModule.updateDeviceOs('windows');
    */
    public static os(): string {

        const ua: any = window.navigator.userAgent;
        let os: string = 'other';

        //Windows
        if (window.navigator.platform.indexOf('Win') != -1) {

            os = 'windows';

            //Windows 以外
        } else {

            if (ua.match(/iPhone|iPad/)) {
                os = 'ios';
            } else if (ua.match(/Mac|PPC/)) {
                os = 'mac';
            } else if (ua.match(/Android ([\.\d]+)/)) {
                os = 'android';
            }
        }

        return os;
    }


    /*
        デバイス名を返す
        mb, tablet, pc

        使用例
        themeMainModule.updateDeviceDevice('mb');
    */
    public static device(): string {

        const ua: any = window.navigator.userAgent;
        let device: string = 'other';

        if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
            device = 'mb';

        } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
            device = 'tablet';

        } else {
            device = 'pc';

        }

        return device;
    }


    /*
        もらった数字からmediaqueryを返す
        pc, tablet, mb

        tablet: 1025,
        mobile: 680
    */
    public static size(w: number): string {

        let size: string = 'pc';

        if (1025 < w) {

        } else if (680 >= w) {
            size = 'mb';

        } else if (1025 >= w) {
            size = 'tablet';
        }

        return size;
    }


}
