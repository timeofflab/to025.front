<template lang="pug">
    .nav(:class="{'-active': isActive}")
        .nav-close
            button.hamburger.hamburger--spin(type='button' @click="onClickToggle" :class="{'is-active': isActive}")
                span.hamburger-box
                    span.hamburger-inner
            .nav-label.en(:class="{'-open': isActive}")
                .label.-open menu
                .label.-close close                
            
        transition(name="tr-left-right-no-opacity" mode="out-in")
            .nav-open(v-if="isActive")
                .nav-open-content(ref="navOpenContent")
                    .nav-open-body
                        .nav-open-logo
                            sImg(src="/share/logo-mark.svg" alt="YUKAKO BALLET ACADEMY")
                        ul.primary
                            li
                                .link-btn(@click="onClickScrollTo('top')")
                                    h4.en Top
                                    h5 トップページ
                            li
                                .link-btn(@click="onClickScrollTo('philosophy')")
                                    h4.en Philosophy
                                    h5 教室について
                            li
                                .link-btn(@click="onClickScrollTo('instructor')")
                                    h4.en Instrutor
                                    h5 講師紹介
                            li
                                .link-btn(@click="onClickScrollTo('class')")
                                    h4.en Class
                                    h5 クラス紹介
                            li
                                .link-btn(@click="onClickScrollTo('schedule')")
                                    h4.en Schedule & Price
                                    h5 スケジュール & 料金
                            li
                                .link-btn(@click="onClickScrollTo('studio')")
                                    h4.en Studio
                                    h5 スタジオ
                            li
                                .link-btn(@click="onClickScrollTo('insta')")
                                    h4.en News
                                    h5 バレエ教室の日常
                            li
                                .link-btn(@click="onClickScrollTo('qa')")
                                    h4.en Q and A
                                    h5 よくあるご質問
                            li
                                .link-btn(@click="onClickScrollTo('contact')")
                                    h4.en Contact
                                    h5 コンタクト
                        .secondary
                            .followus
                                .head.en FOLLOW US
                                .sns
                                    ah.-hover-op(:to="mc.sns.fb")
                                        icon-fb.ifb
                                    ah.-hover-op(:to="mc.sns.instagram")
                                        icon-instagram.iinstagram
                                
                .nav-close-area(@click="onClickToggle()" :style="styleNavContent")
            
        .nav-logo
            sImg(src="/share/logo-type.svg" alt="YUKAKO BALLET ACADEMY")
            
        .nav-contact(@click="onClickScrollTo('contact')") お問い合わせ
            
</template>
<script lang="ts" src="./Navigation.ts"/>
