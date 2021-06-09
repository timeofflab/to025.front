import CryptoJS from "crypto-js";

export class CryptUtil {

    public static sha384(txt: string): string {
        return CryptoJS.SHA384(txt).toString();
    }

    /**
     * @param keyLength
     */
    public static generateKey(keyLength: number = 16): string {
        let key = "";
        let hex = "0123456789abcdef";

        for (let i = 0; i < hex.length; i++) {
            key += hex.charAt(Math.floor(Math.random() * keyLength));
        }
        return key;
    }

    /**
     *
     * @param body
     * @param pass
     * @returns {string}
     */
    public static encrypt(body: string, pass: string): string {
        let iv = CryptoJS.enc.Hex.parse(self.generateKey());
        let options = {iv: iv, mode: CryptoJS.mode.CBC};

        return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(body), pass, options).toString();
    }

    /**
     *
     * @param encrypted
     * @param pass
     * @returns {string}
     */
    public static decrypt(encrypted: string, pass: string): string {
        let decrypted = CryptoJS.AES.decrypt(encrypted, pass);
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}

const self = CryptUtil;
