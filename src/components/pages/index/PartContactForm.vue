<template lang="pug">
.contact-wrapper
    client-only
        iframe.service-frame(scrolling="no"
            :src="iframeUrl"
            style="position: fixed; width: 1px; height: 1px; left:-10px; top:-10px;"
            v-if="!isDummy")

    .contact-box(v-if="!!state.param.debug")
        hr
        .debug(style="padding: 0 3rem")
            pre(v-text="debugL" style="line-height: 1.8rem")
        hr

    client-only
        .contact-box(v-if="!useForm")
            .form-body
                .alert-container
                    .alert
                        .m 初期化に失敗しました。設定エラーです。

        form(@submit.stop.prevent="onSubmit" v-else)
            .contact-box
                .ptrn-a-head
                    p.ptrn-a-head-sub.vline-en
                        span.en Contact
                    h2.ptrn-a-head-primary
                        p.ptrn-a-head-primary-main.vline お問い合わせ
                .form-body(v-if="!isSend")
                    p
                        | レッスンに関する疑問など、
                        | お気軽にお問い合わせください。
                    //err
                    Err(:e="extEdit.e(['_', '_token', '_captcha'])")

                    .form-group.-check
                        .form-checks
                            .form-check
                                input.form-check-input(type="checkbox"
                                    id="typeA"
                                    name="typeA"
                                    value="1"
                                    :checked="isCheckedType('A')"
                                    @input="onInput")
                                label.form-check-label(for="typeA") 入会について
                            .form-check
                                input.form-check-input(type="checkbox"
                                    id="typeB"
                                    name="typeB"
                                    value="1"
                                    :checked="isCheckedType('B')"
                                    @input="onInput")
                                label.form-check-label(for="typeB") 見学・体験レッスンについて
                            .form-check
                                input.form-check-input(type="checkbox"
                                    id="typeC"
                                    name="typeC"
                                    value="1"
                                    :checked="isCheckedType('C')"
                                    @input="onInput")
                                label.form-check-label(for="typeC") その他

                    .form-body-container
                        .form-p
                            span.red ＊
                            | 必須
                        .form-group(v-if="isTo985Debug")
                            input.form-control(type="text" placeholder="*DEBUG TO"
                                name="_debug_to"
                                maxlength="50"
                                :value="p(input, '_debug_to', '')"
                                @input="onInput")
                        .form-group
                            input.form-control(type="text" placeholder="お名前 (＊）"
                                name="name"
                                maxlength="50"
                                :value="p(input, 'name', '')"
                                @blur="onBlur"
                                @input="onInput")
                            Err(:e="extEdit.e('name')")
                        .form-group
                            input.form-control(type="text" placeholder="ふりがな (＊）"
                                name="nameKana"
                                maxlength="50"
                                :value="p(input, 'nameKana', '')"
                                @blur="onBlur"
                                @input="onInput")

                            Err(:e="extEdit.e('nameKana')")
                        .form-group
                            input.form-control(type="email" placeholder="メールアドレス (＊）"
                                name="email"
                                maxlength="256"
                                :value="p(input, 'email', '')"
                                @blur="onBlur"
                                @input="onInput")

                            Err(:e="extEdit.e('email')")
                        .form-group
                            input.form-control(type="text" placeholder="住所"
                                name="address"
                                maxlength="100"
                                :value="p(input, 'address', '')"
                                @blur="onBlur"
                                @input="onInput")

                            Err(:e="extEdit.e('address')")
                        .form-group
                            input.form-control(type="tel" placeholder="電話番号"
                                name="tel"
                                maxlength="20"
                                :value="p(input, 'tel', '')"
                                @blur="onBlur"
                                @input="onInput")

                            Err(:e="extEdit.e('tel')")
                        .form-group
                            textarea.form-control(
                                placeholder="お問い合わせ内容 (＊）"
                                maxlength="400"
                                name="body"
                                :value="p(input, 'body', '')"
                                @blur="onBlur"
                                @input="onInput")
                            Err(:e="extEdit.e('body')")

                        .contact-foot
                            .contact-link
                                .btn-txt.-hover-op(@click="onClickPrivacy") プライバシーポリシーについて >>
                            p.note
                                | This site is protected by reCAPTCHA and <br>the Google
                                a(href="https://policies.google.com/privacy" target="_blank" class="") Privacy Policy
                                | and
                                a(href="https://policies.google.com/terms" target="_blank") Terms of Service
                                | apply.

                .form-body(v-else)
                    p
                        | お問い合わせいただき、ありがとうございました。
                        | 確認メールを送信いたしました。
                        | 後日担当者よりご連絡をさせていただきます。
                        | 今しばらくお待ちくださいますよう
                        | よろしくお願いいたします。

            .btn-wrapper(:class="{'-disabled': isSend}")
                button.btn.-send 送　信

</template>
<script lang="ts" src="./PartContactForm.ts"/>
