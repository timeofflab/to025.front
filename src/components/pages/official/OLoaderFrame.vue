<template lang="pug">
    div
        .o-loader-frame-cover(:class="classWrapper"
            @transitionend="onEndTransitionWrapper"
            v-if="isActiveOLoadingFrame")
        transition(name="t-loader" mode="out-in")
            .o-loader-frame(v-if="isLoading" @transitionend="onEndTransition")
                .o-loader-content
                    //p.en {{ vprogress }}%
                    progress(max="100" :value="progress")

</template>
<script lang="ts" src="./OLoaderFrame.ts"/>
