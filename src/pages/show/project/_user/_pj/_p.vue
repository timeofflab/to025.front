<template lang="pug">
.container(:class="[{'-web': isWeb}, {'-ui': isUi}]" :style="[cvTxt, cvBg]")
    .ui-frame
        .info(:class="{'-hover': info_hover}")
            .head(@mouseenter="onInfoMouseEnter" @mouseleave="onInfoMouseLeave")
                .left
                    .title
                        en(:s="global.title")
                .right
                    //.date
                        //en(:s="global.date")
                    .page-nav(:class="'-active' + (active + 1)")
                        button.page-nav-btn(v-for="(item,index) in project_data.items" :key="`pagenav${index}`" @click="onPager(index)")
                            span.en {{ index + 1 }}
                            p.page-nav-memo {{ item.label }}

                    .prevnext
                        button.prev(@click="onPager('prev')" :class="{'-disabled': isFirst}")
                            span.en prev
                        | &#032;&#047;&#032;
                        button.next(@click="onPager('next')" :class="{'-disabled': isLast}")
                            span.en next
                    .btns
                        button.max(@click="onFullscreen()")
                            span.en {{ fullscreen_txt }}
            .foot
                .right
                    span.en {{ active + 1 }}&#047;{{ project_data.items.length }}
            .body
                .prev-area(@click="onPager('prev')" :class="{'-disabled': isFirst}")
                    button.arrow
                        svg(x="0px" y="0px" width="62px" height="40px" viewBox="0 0 62 40" style="enable-background:new 0 0 62 40;" xml:space="preserve")
                            polygon(points="21.927,1.192 24.543,3.809 10.202,18.148 58.881,18.148 58.881,21.849 10.202,21.849 24.543,36.191 21.927,38.808 3.119,19.999 ")
                .next-area(@click="onPager('next')" :class="{'-disabled': isLast}")
                    button.arrow
                        svg(x="0px" y="0px" width="62px" height="40px" viewBox="0 0 62 40" style="enable-background:new 0 0 62 40;" xml:space="preserve")
                            polygon(points="40.073,1.192 37.457,3.809 51.798,18.148 3.119,18.148 3.119,21.849 51.798,21.849 37.457,36.191 40.073,38.808 58.881,19.999 ")
    .img-frame(:class="{'-scroll': isScroll}")
        transition(name="item" mode="out-in")
            .img-container(v-if="isReady" :class="{'-shadow': isShadow}")
                .head(:class="{'-web': isWeb}")
                    .safari
                        .s.s1
                            s-img(src="/safari-bar-01.png")
                        .s.s2
                            s-img(src="/safari-bar-02.png")
                        .s.s3
                            s-img(src="/safari-bar-03.png")
                        .s.s4
                            s-img(src="/safari-bar-04.png")
                        .s.s5
                            s-img(src="/safari-bar-05.png")
                .body
                    s-img(:src="img_path")

    .img-loader-frame
        s-img(v-for="(item,index) in project_data.items" :key="`img${index}`" :src="img(item.img)")

</template>
<script lang="ts" src="./_p.ts"></script>
<style lang="scss">
.grecaptcha-badge {
    pointer-events: none;
    visibility: hidden;
}
</style>
