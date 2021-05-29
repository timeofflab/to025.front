export class NameStyleUtil {

    /**
     * Snake 2 Camel
     * @param str
     */
    public static s2c(str: string): string {
        return str.replace(/_./g,
            function (s) {
                return s.charAt(1).toUpperCase();
            });
    }

    /**
     * Camel 2 Snake
     * @param str
     */
    public static c2s(str: string): string {
        return str.replace(/([A-Z])/g,
            function (s) {
                return '_' + s.charAt(0).toLowerCase();
            }
        );
    }
}
