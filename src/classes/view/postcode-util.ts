// import {appPostcodeModule} from "~/store/app/postcode";

export class PostcodeUtil {

    public static country = 'jp';
    public static lang = 'ja';

    public static filter(postcode: string, country: string = self.country): string {
        return postcode
            .trim()
            .replace(/[^0-9]/g, '');
    }

    public static isPostcode(postcode: string, country: string = self.country): boolean {
        return (/^[0-9]{7}$/.test(postcode));
    }

    public static async getAddressByPostcode(postcode: string,
                                             lang: string = self.lang,
                                             country: string = self.country): Promise<string> {
        return '';
        // await appPostcodeModule.fetch({
        //     country,
        //     lang,
        //     postcode,
        // });
        //e
        // return appPostcodeModule.address;
    }
}

const self = PostcodeUtil;
