<template lang="pug">
.container
    h1 PLAIN - Presentation

    form(method="post" @submit.stop.prevent="onSubmit" v-if="!state.view.submit").block
        .form-group
            input(type="text"
                placeholder="email"
                name="email"
                @input="onInput")
            err(:e="extEdit.e('email')")
        .form-group
            button.btn(type="button"
                @click="onClickSubmit") Login
    .block(v-else)
        h2 メールを送信しました
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss">
.grecaptcha-badge {
    pointer-events: none;
    visibility: hidden;
}
</style>
