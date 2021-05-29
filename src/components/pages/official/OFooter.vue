<template lang="pug">
    
    .footer
        .footer-primary
            sImg.footer-logo(src="/share/logo-mark.svg" alt="" :size="false")
            .footer-primary-body
                .footer-head
                    sImg.footer-logo-type-h(src="/share/logo-type-horizontal.svg" alt="YUKAKO BALLET ACADEMY")
                    p 001-0013 札幌市北区北13条西3丁目1-26
                .footer-body
                    h3.footer-body-head
                        s-img.itel(src="/share/icon-tel.svg")
                        | お電話での問い合わせはこちら
                    .footer-tel
                        .tel-num 090-3019-2982
                        .tel-open [受付時間 10時 - 20時]
                .footer-option
                    | ＊レッスン中など電話に出られない場合がございます。
                    | 留守番電話にお名前、お電話番号、<br>ご用件を残していただければ折り返しご連絡いたします。

        .footer-secondary
            .copyright
                p.en © YUKAKO BALLET STUDIO. ALL RIGHTS RESERVED.
                
            .followus
                .head.en FOLLOW US
                .sns
                    ah.-hover-op(:to="mc.sns.fb")
                        icon-fb.ifb
                    ah.-hover-op(:to="mc.sns.instagram")
                        icon-instagram.iinstagram
        .backtotop.-hover-op(@click="onClickScrollTo('top')")
            sImg(src="/share/gototop.svg" alt="")
            p.en back to top
            
</template>
<script lang="ts" src="./OFooter.ts"/>
