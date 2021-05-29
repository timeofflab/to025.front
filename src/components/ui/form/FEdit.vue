<template lang="pug">
    fg-input(
        :cid="cid"
        :type="type"
        :title="title"
        :en="en"
        :name="name"
        :value="value"
        :maxlength="maxlength"
        :required="required"
        :values="values"
        @input="onInput"
        @blur="onBlur")
</template>
<script lang="ts" src="./FEdit.ts"/>
