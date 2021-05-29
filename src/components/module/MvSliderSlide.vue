<template lang="pug">
    .mv-slider-slide(:class="[{'-active': isActive}, {'-ex-active': exActive == i}]")
        s-img(:src="`/upload/artists/${d.id}/${d.imgs[0]}`")

</template>
<script lang="ts" src="./MvSliderSlide.ts"></script>
