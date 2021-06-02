<template lang="pug">
div
    h3 Page {{ pageL }}
    template(v-for="f in state.config.form.schemas")
        FgInput(:cid="state.config.editId" :name="f.name")

    .form-group
        a.btn.btn-primary(href="#" @click.stop="onClickSave") save

</template>
<script lang="ts" src="./EditItem.ts"/>
