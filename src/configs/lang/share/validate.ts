export const LangValidate = {
    ja: {
        e500: '通信エラーです。端末の通信状態をご確認ください、しばらくまってからリロードして操作をやり直してください',
        formToken: 'システムエラーの可能性があります。 しばらく待ってからブラウザをリロードしてもう一度操作をしてみてください',
        csrfToken: '通信エラーの可能性があります。 ブラウザをリロードしてもう一度操作をしてみてください',
        recaptchaV3Init: 'RecaptchaV3の初期化に失敗しました。お手数ですが、しばらく待ってみて再度試してみてください。',
        recaptchaV3: '自動入力が疑われる操作が検出されました。 大変お手数ですが手入力を加えた操作をいくつか行ってから再送信してみてください',
        req: '入力してください',
        reqSelect: '選択してください',
        loginId: '既に使用されているか、使用できないメールアドレスです',
        LoginIdExists: '既に使用されているか、使用できないメールアドレスです',
        LoginIdRateLimit: 'アクセス制限中です、数分お待ちください',
        LoginIdRateLimitDelay: 'アクセス制限中です、数分お待ちください',
        loginIdWait: 'しばらくおまちください', // 送信過多
        noLoginId: '登録されていないメールアドレスです',
        maxLength: '%max%文字以内で入力してください',
        minLength: '%min%文字以上で入力してください',
        strRange: '%min%文字～%max%文字で入力してください',
        auth: 'IDまたはパスワードが違います',
        passwordChar: '半角文字英数字と記号で入力してください',
        isNumberString: '半角の数字を入力してください',
        isEmail: 'メールアドレスを入力してください',
        isTel: '000-0000-0000 半角数字とハイフン(-)で入力してください',
        isPostCode: '半角数字7桁で入力してください',
        compare: '入力内容が違います',
        accept: '同意が必要です',
        fileSize: 'ファイルサイズが大きすぎます。 %sMB以内のファイルを指定して下さい。 ',

        signupTrans: '登録処理のエラーです。 最初からやり直してください',
    },
    en: {
        csrf: 'Csrf or connection error. Please reload browser',
        captcha: 'Captcha error, Please include human manipulation',
        req: 'Required',
        loginId: 'Email is exists',
        loginIdWait: 'Please wait',
        noLoginId: 'Email not found',
        maxLength: 'Max %max% chars',
        minLength: 'Min %min% chars',
        strRange: '%min% - %max% chars',
        auth: 'Auth failed (ID or password)',
        passwordChar: 'Password char request a-z,A-Z,0-9 with symbol',
        isNumberString: 'Only number',
        isEmail: 'Format is E-mail xxx@yyy.zzz',
        isTel: 'Format is +000-000-0000-0000',
        isPostCode: 'Japan post code 7 digit 0000000',
        compare: 'Different from confirmation',
        acceptTerms: 'You need agree',

        signupTrans: 'Signup error',
    },
};
