<template lang="pug">
div
    div(v-if="isReady")
        div
            router-link(to="/my") Home

        div(v-if="!record")
            h1 Record Error
        div(v-else)
            h1 Presentation
            h2 {{ pjGlobal.title }}
            h3
                a(href="#") preview
                a(href="#") publish

            EditGlobal

            hr
            h2 Pages
            h3 List
                a(href="#") sort
            ul
                li(v-for="(r, idx) in pjItems")
                    a(href="#")  {{ p(r, 'label') }}
                    a(href="#") X
                li
                    a(href="#" @click.stop="onClickAddItem") +
</template>
<script lang="ts" src="./_id.ts"/>
