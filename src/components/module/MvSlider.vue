<template lang="pug">
    .mv-slider(@mousemove="mousemove" @mouseleave="mouseleave" v-touch:swipe="onPager" v-touch-class="'-touch-active'" :class="[instanceId, {'-photo': d[active].type == 'photo'} ]" ref="mvSlider")
        .mv-slider-wrapper(@mouseover="mouseover('detail')")
            mv-slider-slide(v-for="(item, index) in d" :key="`slide${index}`" :d="item" :i="index")
        template(v-if="deviceSize != 'mb'")
            .mousefollow-frame(:class="[classMousefollow, {'-active': isMousefollow}]")
                .mousefollow-wrapper(:style="{ left: x + 'px', top: y + 'px' }")
                    .mousefollow-container
                        .mousefollow-prev
                            span.en ←
                        .mousefollow-next
                            span.en →
                        .mousefollow-detail
                            span.en Read more
            .mv-slider-arrow.-prev
                .hit(@click="onPager('prev')" @mouseover="mouseover('prev')" :class="{'-disabled': isFirst}")
            .mv-slider-arrow.-next
                .hit(@click="onPager('next')" @mouseover="mouseover('next')" :class="{'-disabled': isLast}")
</template>
<script lang="ts" src="./MvSlider.ts"></script>
