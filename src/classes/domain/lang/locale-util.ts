import {Locale} from "~/configs/master-const";

export class LocaleUtil {
    public static s2l(s: string, def: Locale = Locale.Ja): Locale {
        switch (s) {
            case 'en':
                return Locale.En;
            default:
                return def;
        }
    }
}
