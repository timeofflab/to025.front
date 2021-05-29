import ImageUtil from "@/classes/utils/image-util";
// import {EnvUtil} from "@/classes/app/env-util";
import {$v} from "@/classes/utils/var-util";

export default class ColorUtil {

    private static averageColorByImageCache: any[] = [];

    /*
        RGBから 暗い色か明るい色か判断する
        value: rgb
        basis: 判断基準 0.5 = 50%
    */
    public static blackOrWhite(value: string, basis: number = 0.5): any {

        if (typeof value != 'string') {
            console.log('Error: ColorUtil.blackOrWhite. Not String Data: ' + value);
            return 'bk';
        }

        if (ColorUtil.isHex(value)) {

            const d = ColorUtil.hexToRgb(value);

            if(!d){
                return 'bk';
            }

            return ColorUtil.blackOrWhiteAction(d, basis);

        } else {
            return ColorUtil.blackOrWhiteAction(value, basis);
        }

    }

    public static blackOrWhiteAction(value: string, basis: number = 0.5): any {

        const rgb: any = value.split(',');

        const r = parseInt(rgb[0]);
        const g = parseInt(rgb[1]);
        const b = parseInt(rgb[2]);
        const max = Math.max(r, g, b);
        const v = max / 255;

        if (v > basis) {
            return 'wh';
        }

        return 'bk';
    }

    /*
        画像が黒か白か
    */
    public static blackOrWhiteFromImage(src: string): any {
        return ColorUtil.averageColorByImage(src)
            .then(ColorUtil.onResolve, ColorUtil.onRejected);
    }

    public static onResolve(value: string) {
//     	console.log('onResolve: ' + value);
        const brightness = ColorUtil.blackOrWhite(value, 0.8);
        return brightness;
    }

    public static onRejected(err: any) {
        console.log(err);
        return 'bk';
    }


    /*
        画像から平均値をとる
    */
    public static averageColorByImage(src: string): any {

//         const cached = self.averageColorByImageCache.findByKey('src', src);
//         if (!!cached) {
//             // console.log('hit');
//             return new Promise((resolve: any) => {
//                 resolve($v.p(cached, 'rgb'));
//             });
//         }
//
//         const srcUserFile = src.replace(/\/common\/img/, '');
//         // console.log('averageColorByImage > ', srcUserFile);
//         const img = new Image();
//         img.crossOrigin = "Anonymous";
//         img.src = ImageUtil.src(EnvUtil.isDummy ? src : srcUserFile);
//         const canvas = document.createElement("canvas")
//         const ctx = canvas.getContext('2d');
//
//         return new Promise((resolve, reject) => {
//             img.onload = () => {
//                 canvas.height = img.height;
//                 canvas.width = img.width;
//                 ctx.drawImage(img, 0, 0);
//                 const imageData = ctx.getImageData(0, 0, img.width, img.height)
//                 let rgba = [0, 0, 0, 0]
//
//                 imageData.data.forEach((v, i) => {
//                     rgba[i % 4] = rgba[i % 4] + v
//                 })
//                 const r = Math.floor(rgba[0] / (img.width * img.height));
//                 const g = Math.floor(rgba[1] / (img.width * img.height));
//                 const b = Math.floor(rgba[2] / (img.width * img.height));
//
//                 // console.log('------------');
// //                 console.log(src);
// //                 console.log(imageData);
// //                 console.log(canvas.height);
// //                 console.log(canvas.width);
// //                 console.log(`${r},${g},${b}`);
// //                 console.log('------------');
//
//                 const rgb = `${r},${g},${b}`;
//                 self.averageColorByImageCache.push({
//                     src,
//                     rgb
//                 });
//
//                 resolve(rgb);
//             };
//
//             img.onerror = (e) => reject(e)
//         });
    }


    /*
        どちらが明るい色か
        1 が明るければ true
    */
    public static isBrighter(value1: string, value2: string): any {
        if (ColorUtil.isHex(value1)) {
            return ColorUtil.brighterFromHex(value1, value2);
        } else {
            return ColorUtil.brighterFromRgb(value1, value2);
        }
    }


    public static brighterFromRgb(value1: string, value2: string): any {

        const color1 = ColorUtil.brightnessFromRgb(value1);
        const color2 = ColorUtil.brightnessFromRgb(value2);

        if (color1 > color2) {
            return true;
        }

        return false;
    }


    public static brighterFromHex(value1: string, value2: string): any {

        const rgb1 = ColorUtil.hexToRgb(value1);
        const rgb2 = ColorUtil.hexToRgb(value2);

        if(!rgb1 || !rgb2) {
            return false;
        }

        const color1 = ColorUtil.brightnessFromRgb(rgb1);
        const color2 = ColorUtil.brightnessFromRgb(rgb2);

        if (color1 > color2) {
            return true;
        }

        return false;
    }


    /*
        明るさを返す
    */
    public static brightnessFromRgb(value: string): any {
        const rgb: any = value.split(',');
        const r = parseInt(rgb[0]);
        const g = parseInt(rgb[1]);
        const b = parseInt(rgb[2]);
        const max = Math.max(r, g, b);
        return max / 255;
    }


    /*
        RGB to HEX
    */
    public static rgbToHex(value: string) {

        if (!value) {
            console.log('Error rgbToHex:' + value);
            return '#ffffff'
        }

        // HEXに変換したものを代入する変数
        let hex: string = '#';
        const rgb1: any = value.split(',');
        const r1: number = parseInt(rgb1[0]);
        const g1: number = parseInt(rgb1[1]);
        const b1: number = parseInt(rgb1[2]);
        const r = r1.toString(16);
        const g = g1.toString(16);
        const b = b1.toString(16);

        const rgb: any = [r, g, b];

        for (var i = 0; i < rgb.length; ++i) {
            // rgb(1,1,1)のようなときHEXに変換すると1桁になる
            // 1桁のときは前に0を足す
            if (rgb[i].length == 1) {
                rgb[i] = '0' + rgb[i];
            }
            hex += rgb[i];
        }

        return hex;
    }

    public static hexToRgb(hex: string) {

        if (!ColorUtil.isHex(hex)) {
            return hex;
        }

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//         return result ? {
//             r: parseInt(result[1], 16),
//             g: parseInt(result[2], 16),
//             b: parseInt(result[3], 16)
//         } : null;
        return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null;
    }

    public static isHex(value: string) {
        if (value.indexOf('#') == -1) {
            return false;
        } else {
            return true;
        }
    }
}

const self = ColorUtil;
