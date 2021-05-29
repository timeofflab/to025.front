<template lang="pug">
    .select-form
        select.form-control(name="name"
            @input="onInput")
            template(v-for="v in values")
                option(:value="v.value" :selected="isSelected(v)") {{ v.label }}

</template>
<script lang="ts" src="./FSelect.ts"/>
