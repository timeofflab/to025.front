<template lang="pug">
    .s-img-component
        template(v-if="!isProgressive")
            img.-loaded-img(ref="img"
                data-state="main"
                :src="imgSrc"
                :srcset="osrcset"
                :alt="oalt"
                :title="otitle"
                :class="[classAspect, {'-loading': isLoading}, {'-active' : true}]"
                :style="styleSize"
                @load="onLoad")
        template(v-else)
            // Thumbnail
            img.-loading-img(ref="imgThumb"
                data-state="thumb"
                data-pin-nopin="true"
                :src="imgThumbSrc"
                :srcset="oThumbSrcSet"
                :alt="oalt"
                :title="otitle"
                :class="[classAspect, {'-loading': isLoading}, {'-active' : !isReady} ]"
                :style="styleSize"
                :width="width"
                :height="height")
            // Main
            client-only
                img.-loaded-img(ref="img"
                    data-state="main"
                    :src="imgSrc"
                    :srcset="osrcset"
                    :alt="oalt"
                    :title="otitle"
                    :class="[classAspect, {'-loading': isLoading}, {'-active' : isReady}]"
                    :style="styleSize"
                    :width="width"
                    :height="height"
                    @load="onLoad" v-if="hasMain")

            transition(name="t-fade" mode="out-in")
                .s-img-loader(v-if="!isReady")
                    p ...

</template>
<script lang="ts" src="./SImg.ts"/>
