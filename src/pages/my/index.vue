<template lang="pug">
div
    h1 My page
    h2 Projects
    ul(v-if="isReady")
        li(v-for="r in records")
            router-link(:to="getRecordLink(r)")
                | {{ p(r, 'id') }} - {{ p(r, 'ex.item.global.title') }}
            a(href="#" @click.stop="onClickRemove(r.id)") X

    hr
    a(href="#" @click.stop="onClickAdd") +
</template>
<script lang="ts" src="./index.ts"/>
