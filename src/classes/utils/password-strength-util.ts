import {PasswordStrength} from "~/configs/master-const";
import {PasswordCharValidator} from "~/classes/app/validator/password-char-validator";

/*
バリデーション
最低8桁、英数字混合

”安全”なパスワードの定義(2020年現在）
・半角文字12文字以上
・小文字英字・大文字英字・数字・記号を1文字以上含む
・6種類以上の文字を利用する

強度チェックツール
[弱]
上記以外

[中]
・半角文字10文字以上
・小文字英字・大文字英字・数字を1文字以上含む
・5種類以上の文字を利用する

[強]
・半角文字12文字以上
・小文字英字・大文字英字・数字・記号を1文字以上含む
・6種類以上の文字を利用する
 */
export class PasswordStrengthUtil {
    /**
     * パスワードの強度判定
     * @param password
     */
    public static strength(password: string): PasswordStrength {

        if (self.gtStrength(password)) {
            return PasswordStrength.Strong;
        }

        if (self.gtNormal(password)) {
            return PasswordStrength.Normal;
        }

        return PasswordStrength.Weak;
    }

    /**
     * 強｜パスワード強度
     *
     * @param p
     * @private
     */
    private static gtStrength(p: string): boolean {
        return (p.length >= 12
            && PasswordCharValidator.validChar(p)
            && PasswordCharValidator.validCharType(p, 6)
        );
    }

    /**
     * 中｜パスワード強度
     * @param p
     * @private
     */
    private static gtNormal(p: string): boolean {
        return (p.length >= 12
            && PasswordCharValidator.validChar(p, false)
            && PasswordCharValidator.validCharType(p, 5)
        );
    }
}

const self = PasswordStrengthUtil;
