<template lang="pug">
    main-frame(:class="{'-loaded': isLoaded}" ref="serviceFrame")
        slot
</template>
<script lang="ts" src="./ServiceFrame.ts"/>
