<template lang="pug">
    .modal-dialog.-privacy
        transition-wrapper-default(name="tr-popup" mode="out-in"
            @animatedOpen="onAnimatedOpen"
            @animatedClose="onAnimatedClose")
            .modal-wrapper(v-if="isOpen" :class="classContent")
                .modal-content
                    .modal-primary
                        h2.modal-page-head プライバシーポリシーについて
                        .modal-page-body
                            p.-intro
                                | YUKAKO BALLET ACADEMY（以下「当校」といいます）は、以下のとおり個人情報保護方針を定め、個人情報保護の仕組みを構築し、全従業員に個人情報保護の重要性の認識と取組みを徹底させることにより、個人情報の保護を推進致します。
                            h3.modal-page-h3 ●個人情報の管理
                            p
                                | 当校は、お客さまの個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、セキュリティシステムの維持・管理体制の整備・社員教育の徹底等の必要な措置を講じ、安全対策を実施し個人情報の厳重な管理を行ないます。
                            
                            h3.modal-page-h3 ●個人情報の利用目的
                            p
                                | お客さまからお預かりした個人情報は、当校からのご連絡や業務のご案内やご質問に対する回答として、電子メールや資料のご送付に利用いたします。
                            h3.modal-page-h3 ●個人情報の第三者への開示・提供の禁止
                            p
                                | 当校は、お客さまよりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。
                                | - お客さまの同意がある場合
                                | - お客さまが希望されるサービスを行なうために当校が業務を委託する業者に対して開示する場合
                                | - 法令に基づき開示することが必要である場合
                            h3.modal-page-h3 ●法令、規範の遵守と見直し
                            p
                                | 当校は、保有する個人情報に関して適用される日本の法令、その他規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。
                            h3.modal-page-h3 ●お問い合せ
                            p
                                | 当校の個人情報の取扱に関するお問い合せは下記までご連絡ください。
                            p
                                | YUKAKO BALLET ACADEMY
                                | 電話：090-3019-2982
                                | 受付時間：10時 - 21時
                            
                            .modal-page-footer
                                button.btn-close(type="button" @click="onClickCancel")
                                    s-img(src="/share/close.svg")
                                    p close
</template>
<script lang="ts" src="./Privacy.ts"/>
