<template lang="pug">

    .console-frame
        .head
            button.icon-close(@click="onToggle")

        .body(v-if="active")
            template(v-for="l in logs")
                en(tag="p" :s="l")
</template>
<script lang="ts" src="./Console.ts"/>
