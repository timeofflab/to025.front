<template lang="pug">
    comopnent(:is="tag"
        :to="link"
        :href="link"
        :target="otarget"
        :rel="rel")
        slot
</template>
<script lang="ts" src="./AH.ts"/>
