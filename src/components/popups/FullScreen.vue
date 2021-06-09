<template lang="pug">
transition(name="t-loader" mode="out-in")
    .m-popup-frame(v-if="isPopupFullscreen")
        .m-popup-layer.m-pop--s.m-pop-bg--bk
            .m-popup-wrapper.g5w
                .m-popup-body
                    .m-popup
                        .m-close-wrapper
                            .m-close(@click="onClickClose()")
                        div
                            .m-body
                                .m-contents
                                    .m-block
                                        .m-read
                                            en(s="デザインを正しく表示するために、フルスクリーンでの閲覧を推奨しております。 フルスクリーンで表示してよろしいですか?")
                            .m-btns
                                button.m-btn(@click="onClickClose()") いいえ
                                button.m-btn.-st(@click="onClickFullscreen()") はい
</template>
<script lang="ts" src="./FullScreen.ts"/>
