import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import $ from 'jquery';
import {$v} from "~/classes/utils/var-util";
import {EnvUtil} from "~/classes/utils/env-util";
import {cRecaptchaV3Module} from "~/store/c/recaptcha-v3";


declare var grecaptcha: any;

// @ts-ignore
@Component
export default class RecaptchaV3 extends Vue {

    @Prop({default: 'injectRecaptcha'})
    public elmId: string;

    @Prop({default: ''})
    public siteKey: string;

    @Watch('currentSiteKey')
    public watchCurrentSiteKey() {
        this.initScript();

        if (!$v.isEmpty(this.currentSiteKey)) {
            setTimeout(() => {
                console.log('@Watch > ', this.grecaptcha());
            }, 1000);
        }
    }

    public mounted() {
        console.log('RecaptchaV3 > mounted > ', this.currentSiteKey);
        this.initScript();
    }

    public destroyed() {
        this.queryInjectRecaptcha().remove();
        $('.grecaptcha-badge').parent().remove();
    }

    // Computed //////////////////////////////////////////////
    public get currentSiteKey(): string {
        return ($v.isEmpty(this.siteKey))
            ? cRecaptchaV3Module.siteKey
            : this.siteKey;
    }

    public initScript() {

        if ($v.isEmpty(this.currentSiteKey) || this.hasElement()) {
            return;
        }

        const src = `<script id="${this.elmId}" src="https://www.google.com/recaptcha/api.js?render=${this.currentSiteKey}"></script>`;
        $('body > *:last').after(src);
    }

    public queryInjectRecaptcha(): JQuery {
        return $('script#injectRecaptcha');
    }

    public hasElement(): boolean {
        return this.queryInjectRecaptcha().length > 0;
    }

    public grecaptcha(): any {
        return $v.p(window, 'recaptcha');
    }

    public submit() {
        return new Promise((resolve: any, reject: any) => {
            if (!grecaptcha) {
                reject('');
            }

            grecaptcha.ready(() => {
                grecaptcha.execute(this.currentSiteKey, {action: 'submit'}).then((token: string) => {
                    // Add your logic to submit to your backend server here.
                    console.log('[recaptchav2] callback > ', token);
                    resolve(token);
                });
            });
        });
    }
}
