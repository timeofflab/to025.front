<template lang="pug">
    div
        template(v-if="!!str")
            VueQrcode(:value="str" :options="state.config.qr" tag="img")
</template>
<script lang="ts" src="./Qr.ts"/>
