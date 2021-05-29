import {AToComponent} from "~/classes/components/a-to-component";
import {$v} from "~/classes/utils/var-util";
import {LangLabelUtil} from "~/classes/domain/lang/lang-label-util";
import WUtil from "~/classes/view/w-util";
import {appModule} from "~/store/app";
import {Locale} from "~/configs/master-const";
import {officialModule} from "~/store/official";
import {MainConst} from "~/configs/main-const";
import ApiClientUtil from "~/classes/api/api-client-util";
import {debugModule} from "~/store/debug";

const TAG = 'AOfficialComponent';

export abstract class AOfficialComponent extends AToComponent {

    public state: any = {
        param: {
            lang: 'ja',
        },
        vars: {} as any,
    };

    // Methods ////////////////
    public v(name: string, def: any = ''): any {
        if (this.isViewVar) {
            return '%' + name + '%';
        } else {
            // console.log('vars > name=%s , ', name, $v.p(this.vars, name), this.vars);
            return $v.p(this.vars, name) || def;
        }
    }

    // Getters /////////////////
    public get isDebug(): boolean {
        return !$v.isEmpty(debugModule.code);
    }

    public get isDummy(): boolean {
        return ApiClientUtil.isDummy;
    }

    public get hasDebugCode(): boolean {
        return !$v.isEmpty(this.debugCode);
    }

    public get debugCode(): string {
        return debugModule.code;
    }

    public get MC(): any {
        return MainConst;
    }

    public get isViewVar(): boolean {
        return $v.p(this.param, 'view') === 'var';
    }

    public get param(): any {
        return this.state.param;
    }

    public get lang(): any {
        return this.state.param.lang;
    }

    public get vars(): any {
        return this.state.vars;
    }

    // Protected /////////////////////////////
    public _AOfficialComponent_create() {
        if (WUtil.isBrowser) {
            appModule.updateLang($v.p(this.$route, 'query.l') as Locale
                || LangLabelUtil.detectHostByHost(location.hostname));
            appModule.loadLs().then();
        }
        officialModule.updatePageId($v.p(this, 'pageId'));
    }

    public _AOfficialComponent_head(base: any = {}) {
        return {
            ...{
                title: this.__('title', 'PageTitle'),
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: this.__('description', 'pageDescription')
                    },
                    {
                        hid: 'og:description',
                        name: 'og:description',
                        content: this.__('description', 'pageDescription')
                    },
                    {
                        httpEquiv: 'Content-Language',
                        content: this.lang,
                    },
                ],
            },
            ...(base || {}),
        }
    }
}
