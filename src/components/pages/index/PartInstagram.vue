<template lang="pug">
.insta-wrapper

    iframe.service-frame(scrolling="no"
        src="/service/instagram"
        style="position: fixed; width: 1px; height: 1px; left:-10px; top:-10px;"
        v-if="isViewIFrame")
    div(style="position: fixed; width: 1px; height: 1px; left:-10px; top:-10px;"
        data-iframe="false"
        v-else)

    .insta-head
        .insta-head-arch
            sImg(src="/home/instagram/head.svg" alt="YUKAKO BALLET ACADEMY DIARY")
        h2.insta-head-body バレエスタジオの日常
        client-only(v-if="hasPosts")
            .insta-imgs
                template(v-for="(i, idx) in posts")
                    a(:href="p(i, 'permalink')"
                        target="_blank"
                        rel="noopener noreferrer")
                        img(:src="imgLink(i)")

        .insta-feathers
            .insta-feathers-container
                .insta-feather-a
                    sImg(src="/home/instagram/feather1.png")
                .insta-feather-b
                    sImg(src="/home/instagram/feather2.png")
        .btn-wrapper
            ah.btn.-type-b(:to="MC.link.signuplesson")
                p.btn-label.en instagram
                btn-arrow.arrow
</template>
<script lang="ts" src="./PartInstagram.ts"/>
