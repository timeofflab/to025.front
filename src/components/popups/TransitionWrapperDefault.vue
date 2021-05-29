<template lang="pug">
    .transition-wrap
        transition(name="tr-popup" mode="out-in"
            @after-enter="onAnimatedOpen"
            @after-leave="onAnimatedClose")
            slot
</template>
<script lang="ts" src="./TransitionWrapperDefault.ts"/>
