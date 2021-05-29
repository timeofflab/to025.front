<template lang="pug">
    .alert-container
        .alert
            .m(v-for="_ in e")
                | {{ msg(_, p(_, 'option')) }}
</template>
<script lang="ts" src="./Err.ts"/>
