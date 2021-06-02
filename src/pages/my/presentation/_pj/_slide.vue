<template lang="pug">
div
    div(v-if="isReady")
        div(v-if="!record")
            h1 Record Error
        div
            h1 Presentation - Project 1
            h2 Project
            h3
                a(href="#") preview
                a(href="#") publish

            EditGlobal

            h2 Pages
            h3 List
                a(href="#") sort
            ul
                li(v-for="(r, idx) in pjItems")
                    a(href="#")  {{ p(r, 'label') }}
                    a(href="#") X
                li
                    a(href="#") +
</template>
<script lang="ts" src="./_slide.ts"/>
