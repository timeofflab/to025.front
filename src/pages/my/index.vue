<template lang="pug">
div
    h1 My page
    h2 Projects
    ul(v-if="isReady")
        li(v-for="r in records")
            router-link(:to="getRecordLink(r)") {{ p(r, 'ex.item.global.title') }}
</template>
<script lang="ts" src="./index.ts"/>
