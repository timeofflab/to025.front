<template lang="pug">
.main-frame.-ja(:class="classMf"
    v-resize:debounce="onResize")
    slot
    cmd
    client-only
        console(:active="isConsole")
</template>
<script lang="ts" src="./MainFrame.ts"/>
