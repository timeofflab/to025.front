import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {ExtEdit} from "~/classes/components/ext/ext-edit";
import {pageShowProjectModule} from "~/store/page/show-project";
import {$v} from "~/classes/utils/var-util";
import {CryptUtil} from "~/classes/utils/crypt-util";
import {IPopup, popupModule, PopupState} from "~/store/popup";
import {APopupComponent} from "~/classes/components/a-popup-component";
import {appProjectShowModule} from "~/store/app/project-show";

const TAG = 'C/popups/Auth';

@Component
export default class Auth extends APopupComponent {

    @Prop()
    public cid: string;

    public state = {
        config: {
            editId: 'popupAuth',
        },
        view: {
            ready: false,
        },
    };

    @Watch('_APopupComponent_popup')
    public watchPopup(now: IPopup) {

        const state = $v.p(now, 'state');
        console.log('%s｜watchPopup', TAG, {
            cid: this.cid,
            now,
            state
        });

        switch (state) {
            case PopupState.Close:
                this.state.view.ready = false;
                popupModule.patch({
                    id: this.cid,
                    state: PopupState.Closed,
                });
                break;
            case PopupState.Closed:
                setTimeout(() => {
                    console.log('%s｜////////////////////////////////', TAG, this.cid);
                    popupModule.remove(this.cid);
                }, 1000);
                break;
            default:
                this.state.view.ready = true;
                break;
        }
    }

    @Watch('isReady')
    public watchIsReady(now: boolean) {
        console.log('%s.watchIsReady', TAG, now ? 'T' : 'F');
        if (!now) {
            setTimeout(() => {
                console.log('%s.watchIsReady｜remove', TAG);
                popupModule.remove(this.cid);
            }, 300);
        }
    }

    // Events //////////////////////////////////////
    public async onClickClose() {

    }

    public async onSubmit() {
        await this.extEdit.clearErrors();

        console.log('%s｜submit', TAG, {
            input: this.input,
        });

        const res = await pageShowProjectModule.$show({
            user: $v.p(this.$route, 'params.user'),
            pj: $v.p(this.$route, 'params.pj'),
            password: CryptUtil.sha384(this.input.password), // this.input.password,
        });

        console.log('%s.onSubmit｜', TAG, {res});

        const project = $v.p(res, 'ex.project');
        if (!!project) {
            // appProjectShowModule.updateRecord(project);
            appProjectShowModule.updatePrepare(project);
            await popupModule.close(this.cid);
            await popupModule.open({
                id: 'fs',
                component: 'Fullscreen',
            });
        } else {
            await this.extEdit.updateErrors([
                {
                    name: 'password',
                    messages: ['Auth error'],
                }
            ]);
        }
    }

    public async onClickSubmit() {
        await this.onSubmit();
    }

    public async onInput(e: any) {
        await this.extEdit.onInput(e);
    }

    // Computed ////////////////////////////////////
    public get extEdit(): ExtEdit {
        return new ExtEdit(this);
    }

    public get input(): any {
        return this.extEdit.input;
    }

    public get errors(): any {
        return this.extEdit.errors;
    }

    public get isReady(): boolean {
        return this.state.view.ready;
    }

    // Evetns //////////////////////////////////////
    public async mounted() {
        await this.initInput();

        await this.$nextTick(() => {
            this.state.view.ready = true;
        });
    }

    public async initInput() {
        await this.extEdit.updateInput({
            password: '',
        });
    }
}


