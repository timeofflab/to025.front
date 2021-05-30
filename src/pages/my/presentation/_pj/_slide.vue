<template lang="pug">
div
    h1 Presentation - Project 1
    h2 Project
    h3
        a(href="#") preview
        a(href="#") publish
    h3 Global

    .form-group
        input(type="text" placeholder="date")
    .form-group
        input(type="text" placeholder="proposer")
    .form-group
        input(type="text" placeholder="title")
    .form-group
        input(type="text" placeholder="transition")
    .form-group
        input(type="text" placeholder="txt")
    .form-group
        input(type="text" placeholder="bg")
    .form-group
        input(type="text" placeholder="limit")
    .form-group
        input(type="text" placeholder="Basic Auth ID")
    .form-group
        input(type="text" placeholder="Basic Auth Pass")
    .form-group
        a.btn.btn-primary(href="#") save

    h2 Pages
    h3 List
        a(href="#") sort
    ul
        li(v-for="p in 10")
            a(href="#") Page {{ p }}
            a(href="#") X
        li
            a(href="#") +
    h3 Page 1

    .form-group
        input(type="text" placeholder="Label")
    .form-group
        input(type="text" placeholder="img")
    .form-group
        input(type="text" placeholder="bg")
    .form-group
        input(type="text" placeholder="shadow")
    .form-group
        input(type="text" placeholder="web")
    .form-group
        input(type="text" placeholder="scroll")
    .form-group
        a.btn.btn-primary(href="#") save
</template>
<script lang="ts" src="./_slide.ts"/>
