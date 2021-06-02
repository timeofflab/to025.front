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
            ul.items
                li(v-for="(r, idx) in pjItems"
                    :class="classPageItem(idx)")
                    span.-active-mark ＞
                    router-link(:to="linkPage(idx)")  {{ p(r, 'label') }}
                    a(href="#" @click.stop="onClickRemoveItem(idx)") X
                li
                    a(href="#" @click.stop="onClickAddItem") +

            EditItem

</template>
<script lang="ts" src="./_page.ts"/>
<style lang="sass">

.items
    .-active-mark
        display: none

    .-active
        .-active-mark
            display: inline-block


</style>
