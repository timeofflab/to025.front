<template lang="pug">
    span
        template(v-if="type=='textarea'")
            textarea.form-control(
                :placeholder="placeholder"
                :name="name"
                :value="value"
                :maxlength="maxlength"
                :class="classTextarea"
                @input="onInput"
                @blur="onBlur")
        template(v-else)
            input.form-control(
                :type="type"
                :placeholder="placeholder"
                :name="name"
                :value="value"
                :maxlength="maxlength"
                :class="classInput"
                @input="onInput"
                @blur="onBlur")
</template>
<script lang="ts" src="./FInput.ts"/>
