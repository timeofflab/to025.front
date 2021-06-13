<template lang="pug">
    .popup-layer.modal(:class="classRoot")
        template(v-for="(p, idx) in popups")
            component(:is="p.component"
                :cid="p.id"
                :style="stylePopup(p, idx)")
        .modal-bg
</template>
<script lang="ts" src="./PopupLayer.ts"/>

