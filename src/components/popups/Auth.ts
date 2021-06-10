import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";
import {ExtEdit} from "~/classes/components/ext/ext-edit";
import {pageShowProjectModule} from "~/store/page/show-project";
import {$v} from "~/classes/utils/var-util";
import {CryptUtil} from "~/classes/utils/crypt-util";
import {appProjectModule} from "~/store/app/project";
import {appProjectShowModule} from "~/store/app/project-show";

const TAG = 'C/popups/Auth';

@Component
export default class Auth extends AToComponent {

    public state = {
        config: {
            editId: 'popupAuth',
        },
    };

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
            appProjectShowModule.updateRecord(project);
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

    public get isShow(): boolean {


        console.log('%s｜isShow: ', TAG, {
            mode: appProjectModule.mode,
            auth: appProjectShowModule.authorization,
            record: appProjectShowModule.record
        })

        return (
            appProjectModule.mode === 'show'
            && appProjectShowModule.authorization
            && !appProjectShowModule.record
        );
    }

    // Evetns //////////////////////////////////////
    public async mounted() {
        await this.initInput();
    }

    public async initInput() {
        await this.extEdit.updateInput({
            password: '',
        });
    }
}


