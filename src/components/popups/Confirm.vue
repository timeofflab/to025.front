<template lang="pug">
    .modal-dialog.c-confirm
        transition-wrapper-default(name="tr-popup" mode="out-in"
            @animatedOpen="onAnimatedOpen"
            @animatedClose="onAnimatedClose")
            .modal-wrapper(v-if="isOpen" :class="classContent")
                .modal-content
                    .modal-primary
                        form(@submit.stop.prevent="onSubmit")
                            .modal-header
                                button.close(@click.stop.prevent="onClickCancel")
                                    .icon-close
                            .modal-body
                                en.modal-title(tag="h3" :s="title")
                                en.body.-txt-center(tag="p" :s="message")

                            .modal-footer.-between
                                button.btn.-r.-short(type="button" @click="onClickCancel") {{ btnCancelL }}
                                button.btn.-r.-short(type="button" @click="onClickOk") {{ btnOkL }}
</template>
<script lang="ts" src="./Confirm.ts"/>
