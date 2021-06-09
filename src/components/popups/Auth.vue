<template lang="pug">
transition(name="t-loader" mode="out-in")
    .m-popup-frame(v-if="isShow")
        .m-popup-layer.m-pop--s.m-pop-bg--bk
            .m-popup-wrapper.g5w
                .m-popup-body
                    form.m-popup(@submit.stop.prevent="onSubmit")
                        .m-close-wrapper
                            // .m-close(@click="onClose()")
                        div
                            .m-body
                                .m-contents
                                    .m-block
                                        .m-read
                                            en(s="パスワードが必要です")
                                            input(type="text"
                                                name="password"
                                                :value="input.password"
                                                @input="onInput")
                                            err(:e="extEdit.e('password')")
                            .m-btns
                                button.m-btn.-st(@click="onClickSubmit()") 送信
</template>
<script lang="ts" src="./Auth.ts"/>
