<template lang="pug">
    .slide-thumb(:class="'-d' + display")
        sImg(v-for="(n, h) in imgs" :key="`${id}_${h}`"
            :src="`/project/thumb/${id}${n}.jpg`" :size="false")
</template>
<script lang="ts" src="./SlideThumb.ts"/>
