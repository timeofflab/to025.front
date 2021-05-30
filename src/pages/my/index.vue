<template lang="pug">
div
    h1 My page
    h2 Projects
    ul
        li
            router-link(to="/my/presentation/p1") P1
        li
            router-link(to="/my/presentation/p2") P2
        li
            router-link(to="/my/presentation/p3") P3
</template>
<script lang="ts" src="./index.ts"/>
