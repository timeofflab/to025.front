import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {AOfficialComponent} from "~/classes/components/a-official-component";
import {MainConst} from "~/configs/main-const";
import {IPopup, PopupModule, popupModule} from "~/store/popup";
import {ExtEdit} from "~/classes/components/ext/ext-edit";
import {ExtLoading} from "~/classes/components/ext/ext-loading";
import {$v} from "~/classes/utils/var-util";
import {appModule, FrameType} from "~/store/app";
import {to985Module} from "~/store/to985";
import {To1005} from "~/classes/domain/to1005";
import {cRecaptchaV3Module} from "~/store/c/recaptcha-v3";
import {pageServiceContactModule} from "~/store/page/service-contact";
import {To985} from "~/classes/domain/to985";
import {EnvUtil} from "~/classes/utils/env-util";
import {debugModule} from "~/store/debug";
import {IErrorBag} from "~/store/edit";
import {To985ValidatorUtil} from "~/classes/domain/to985/to985-validator-util";

const TAG = 'PartContactForm';

@Component
export default class PartContactForm extends AOfficialComponent {

    public mc: any = MainConst;
    public pageId = 'home';
    public open: string = '';
    public isSend: boolean = false;
    public state = {
        config: {
            editId: 'contactForm',
            iframeUrl: '/service/contact-form',
        },
        param: {
            debug: '',
        },
        view: {
            fail: false,
        },
        dummy: {
            useForm: false,
        },
    };

    // Watch //////////////////////////////////////////////////
    @Watch('popups')
    public watchPopups(now: IPopup[]) {
        console.log('[%s] watchPopup', TAG);
        if (now.length === 0) {
            this.open = '';
        }
    }

    // Computed ////////////////////////////////////////////////
    public get extEdit(): ExtEdit {
        return new ExtEdit(this);
    }

    public get extLoading(): ExtLoading {
        return new ExtLoading(this);
    }

    public get useForm(): boolean {
        return this.isDummy
            ? this.state.dummy.useForm
            : !$v.isEmpty(this.to985Token);
    }

    public get input(): any {
        return this.extEdit.input;
    }

    public get popups(): IPopup[] {
        return popupModule.popups;
    }

    public get deviceSize(): any {
        return appModule.deviceSize;
    }

    public get to985Token(): string {
        return to985Module.token;
    }

    public get isTo985Debug(): boolean {
        return to985Module.debug;
    }

    public get isDummy(): boolean {
        return super.isDummy;
    }

    public get iframeUrl(): string {
        const d = debugModule.code;
        return this.state.config.iframeUrl + ($v.isEmpty(d) ? '' : `?debug=${d}`);
    }

    public get debugL(): string {

        const r: string[] = [];

        r.push(`
- DEBUG:
TO985_IFRAME: ${to985Module.iframe ? 'T' : 'F'}
APP_MODE: ${EnvUtil.APP_MODE}
API_MODE: ${EnvUtil.API_MODE}
APP_TYPE: ${EnvUtil.APP_TYPE}
TOKEN: ${this.to985Token.substr(0, 10)}...
        `.trim());

        if (this.isTo985Debug) {
            r.push(`
- EX:
TO985_DEBUG: ${this.isTo985Debug ? 'T' : 'F'}
API_BASE_URL: ${EnvUtil.TO985_API_BASE}
            `.trim());
        }

        return r.join("\n");
    }

    public get errors(): IErrorBag[] {
        return this.extEdit.errors;
    }

// Methods ////////////////////////////////////////////////
    public async onClickPrivacy() {
        console.log('openPrivacy()');
        await popupModule.open({
            id: 'Privacy',
            component: PopupModule.Privacy,
        });
    }

    public isCheckedType(type: string): boolean {
        return Number($v.p(this.input, `type${type}`)) === 1;
    }

    public scrollToContact() {
        To1005.Page.scrollToContact();
    }

    // Events ////////////////////////////////////////////////////
    public async onSubmit() {
        this.state.view.fail = false;

        if (!await this.extEdit.valid([], this.input, new To1005.Form.Contact())) {
            this.$nextTick(() => {
                this.scrollToContact();
            });
            console.log('%s.valid failed｜p2', TAG, this.extEdit.errors);
            return;
        }

        // @dummy
        if (this.isDummy) {
            setTimeout(() => {
                this.isSend = true;
                this.$nextTick(() => {
                    this.scrollToContact();
                })
            }, 1500);
            return;
        }

        await this.extLoading.load(async () => {
            console.log('%s.load｜start', TAG, this.input);

            const siteCd = EnvUtil.TO985_SITE_CD;
            const captcha = await cRecaptchaV3Module.captcha();
            // const captcha = '';
            if ($v.isEmpty(captcha)) {
                this.state.view.fail = true;
                await this.extEdit.updateErrors([
                    {
                        name: '_captcha',
                        messages: [
                            To985ValidatorUtil.message('validation.recaptchaV3Init'),
                        ],
                    }
                ]);
                return false;
            }

            const res = await pageServiceContactModule.$post({
                siteCd,
                body: {
                    ...this.input,
                    ...{
                        _token: this.to985Token,
                        _captcha: captcha,
                    },
                },
            });

            console.log('%s.load｜res', TAG, res);

            if (!res.result) {
                this.state.view.fail = true;
                await this.extEdit.updateErrors($v.p(res, 'ex.messages'));
            } else {
                this.isSend = true;
            }
            this.extLoading.remove();

            return false;
        });
        To985.Util.initClient();
        this.scrollToContact();
    }

    public async onInput(e: any) {
        await this.extEdit.onInput(e);
    }

    public async onBlur(e: any) {
        await this.extEdit.valid([e.target.name], this.input, new To1005.Form.Contact());
    }

    // Base //////////////////////////////////////////////////
    public async mounted() {
        await this.initParam();
        await this.initInput();

        if (this.isDummy) {
            setTimeout(() => {
                this.state.dummy.useForm = true;
            }, 3000);
        }
    }

    public async initParam() {
        this.state.param = {
            debug: $v.p(this.$route, 'query.debug', ''),
        };
    }

    public async initInput() {
        await this.extEdit.updateInput({
            typeA: 0,
            typeB: 0,
            typeC: 0,

            _debug_to: '',
            name: '',
            nameKana: '',

            email: '',

            address: '',
            tel: '',
            body: '',
        });
    }
}
