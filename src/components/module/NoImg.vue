<template lang="pug">
    .no-img
        sImg(v-for="(item,index) in aryNo" :key="`no${index}`" :src="`/share/${item}.svg`")

</template>
<script lang="ts" src="./NoImg.ts"/>
