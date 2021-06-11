<template lang="pug">
transition(name="t-loader" mode="out-in")
    .m-popup-frame(v-if="isShow")
        .m-popup-layer.m-pop--s.m-pop-bg--bk
            .m-popup-wrapper.g5w
                .m-popup-body
                    .m-popup
                        .m-close-wrapper
                            // .m-close(@click="onClose()")
                        div
                            .m-body
                                .m-contents
                                    .m-block
                                        .m-read
                                            en(:s="msg")
</template>
<script lang="ts" src="./E400.ts"/>
