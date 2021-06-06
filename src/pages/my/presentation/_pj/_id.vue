<template lang="pug">
div
    div(v-if="isReady")
        div
            router-link(to="/my") Home

        div(v-if="!record")
            h1 Record Error
        div(v-else)
            h1 Presentation
            h2 {{ p(pjGlobal, 'title', '???') }}
            h3
                a(:href="previewUrl" target="_blank") preview

            EditGlobal

            .form-group
                a.btn.btn-primary(href="#" @click.stop="onClickSave") save

            hr
            h2 Pages
            h3 List

            div(v-if="records.length === 0")
                h4 no items
            div(v-else)
                a.switch(href="#"
                    :class="{off: !state.view.sort}"
                    @click.stop="onClickSort")
                    span.-on cancel
                    span.-off sort

                ul.items(:class="{['-sorting']: state.view.sort}")
                    Draggable(v-model="state.records"
                        handle=".-sort-handle"
                        draggable=".-item"
                        :disabled="!state.view.sort")
                        li.-item(v-for="(r, idx) in records"
                            :class="classPageItem(r)")
                            span.-active-mark ＞
                            span.-sort-handle ○

                            router-link(:to="linkPage(r)")  [{{idx}}] [{{r.id}}] {{ p(r, 'label', '---') }}
                            a(href="#" @click.stop="onClickRemoveItem(idx)") X
                    li.-commit-sort
                        a(href="#" @click.stop="onClickCommitSort") Sort OK
                    li.-add-item
                        a(href="#" @click.stop="onClickAddItem") +

                div.img-preview(v-if="!!p(pageItem, 'img')")
                    s-img(:src="img(p(pageItem, 'img'))" width="100")
                    div IMG: {{img(p(pageItem, 'img'))}}

                EditItem

                .form-group
                    a.btn.btn-primary(href="#" @click.stop="onClickSave") save
</template>
<script lang="ts" src="./_id.ts"/>
<style lang="sass">

.img-preview
    img
        width: 80px

.items
    .-active-mark
        display: none

    .-active
        .-active-mark
            display: inline-block

    .-commit-sort
        display: none

    &.-sorting
        .-add-item
            display: none

        .-active-mark
            display: none

        .-sort-handle,
        .-commit-sort
            display: inline-block


.-sort-handle
    display: none


.-off
    display: none

.off
    .-on
        display: none

    .-off
        display: inline-block

</style>
