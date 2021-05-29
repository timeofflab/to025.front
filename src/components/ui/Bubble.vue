<template lang="pug">
    .bubble(:class="['-' + v, '-' + a, '-' + type]")
        transition(name="tr-bubble" mode="out-in")
            .bubble-wrapper(v-if="isDisplay")
                .bubble-container
                    .bubble-body
                        en(tag="p" :s="body")
                    .bubble-arrow
                        sImg(src="/ui/bubble-arrow-s.png")
</template>
<script lang="ts" src="./Bubble.ts"/>
