<template lang="pug">
    .form-check
        template(v-for="v in values")
            input.form-check-input(type="radio"
                :name="name"
                :id="itemId(v)"
                :value="v.value"
                :checked="isSelected(v.value)"
                @input="onInput")
            en.form-check-label(tag="label" :s="v.label" :for="itemId(v)")
</template>
<script lang="ts" src="./FRadio.ts"/>
