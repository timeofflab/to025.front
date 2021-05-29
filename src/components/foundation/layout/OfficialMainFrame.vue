<template lang="pug">
    main-frame.-official.m-main-frame.-m--pc.ja(:class="{'-display': display}"
        :data-version="version"
        :data-build="build"
        ontouchstart
    )
    
        OLoaderFrame

        .loading-frame
            transition(name="tr-sloader")
                loading-frame(v-if="isLoading || isPageLoading")

        client-only
            .popup-frame(style="z-index: 10")
                PopupLayer

        transition(name="t-loader" mode="out-in")
            .m-popup-frame(v-if="popup_fullscreen")
                .m-popup-layer.m-pop--s.m-pop-bg--bk
                    .m-popup-wrapper.g5w
                        .m-popup-body
                            .m-popup
                                .m-close-wrapper
                                    .m-close(@click="onClose()")
                                div
                                    .m-body
                                        .m-contents
                                            .m-block
                                                .m-read
                                                    en(s="デザインを正しく表示するために、フルスクリーンでの閲覧を推奨しております。 フルスクリーンで表示してよろしいですか?")
                                    .m-btns
                                        button.m-btn(@click="onClose()") いいえ
                                        button.m-btn.-st(@click="onFullscreen()") はい

        template(v-show="isShow")
            overlay-scrollbars(ref="os" :options="scrollOption").scrollbar-page
                .m-base-frame(:class="{'-loaded': !isLoading}")
                    slot
</template>
<script lang="ts" src="./OfficialMainFrame.ts"/>
