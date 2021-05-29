<template lang="pug">
    .modal-dialog.c-alert.-single
        transition-wrapper-default(name="tr-popup" mode="out-in"
            @animatedOpen="onAnimatedOpen"
            @animatedClose="onAnimatedClose")
            .modal-wrapper(v-if="isOpen" :class="classContent")
                .modal-content
                    .modal-primary
                        form(@submit.stop.prevent="onSubmit")
                            .modal-header(v-if="!hideBtnClose")
                                button.close(@click.stop.prevent="onClickOk")
                                    .icon-close
                            .modal-body
                                //en.modal-title(tag="h3" :s="message")
                                //h3.modal-title(v-html="title")
                                en.body.-txt-center(tag="p" :s="message")

                            .modal-footer(v-if="!hideBtnOk")
                                button.btn.-r.-short(type="button" @click="onClickOk") {{ btnOkL }}
</template>
<script lang="ts" src="./Alert.ts"/>
