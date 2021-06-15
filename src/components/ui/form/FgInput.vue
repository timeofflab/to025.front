<template lang="pug">
.form-group(:class="ec")
    label.size-xs-book
        span(v-html="title")
        template(v-if="required")
            span.-required {{ __('@', '(必須)') }}
    template(v-if="['s', 'select'].indexOf(type) >= 0")
        f-select(:cid="cid"
            :name="name")
    template(v-else-if="['c','checkbox','check'].indexOf(type) >= 0")
        f-check(:cid="cid"
            :name="name")
    template(v-else-if="['r', 'radio'].indexOf(type) >= 0")
        f-radio(:cid="cid"
            :name="name")
    template(v-else)
        f-input(:cid="cid"
            :name="name")
    err(:e="eMessages")
    template(v-if="useBubble")
        bubble(:display="isBubble && remainingLength > 0"
            v="top"
            :body="`あと${remainingLength}文字`")
</template>
<script lang="ts" src="./FgInput.ts"/>
