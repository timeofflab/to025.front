<template lang="pug">
.s-img-component.n-img
    img.-loaded-img(ref="img"
        data-state="main"
        :src="imgSrc"
        :srcset="osrcset"
        :alt="oalt"
        :title="otitle"
        :class="[classAspect, {'-loading': isLoading}, {'-active' : true}]"
        :style="styleSize"
        @load="onLoad")
</template>
<script lang="ts" src="./NImg.ts"/>
