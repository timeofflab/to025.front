<template lang="pug">
    .splash-wrapper
        .splash-inner-wrapper
            template(v-if="isReady")
                .splash-container.-for-pc(v-if="deviceSize != 'mb'")
                    .splash-content
                        //未使用

                .splash-container.-for-mb(v-else)
                    .splash-content
                        //未使用

</template>
<script lang="ts" src="./SplashFrame.ts"/>
