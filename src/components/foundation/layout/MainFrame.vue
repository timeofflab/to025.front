<template lang="pug">
.main-frame.-ja(:class="classMf"
    v-resize:debounce="onResize")
    slot
    client-only
        console(:active="isConsole")
        cmd
</template>
<script lang="ts" src="./MainFrame.ts"/>
