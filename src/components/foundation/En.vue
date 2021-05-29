<template>
    <component :is="tag" v-html="out"></component>
</template>

<script lang="ts">
import Vue from 'vue';
import {ToUtil} from "@/classes/utils/to-util";
import {Component, Prop} from "nuxt-property-decorator";

@Component
export default class En extends Vue {
    @Prop({default: '@'})
    public c: string;

    @Prop({default: ''})
    public s: string;

    @Prop({default: 'span'})
    public tag: string;

    public get out(): string {
        // console.log('En > ', this.c, this.s);
        return ToUtil.langTag(String(this.s) || '')
            .replace(/\n[ ]*/g, '<br>');
    }
}
</script>
