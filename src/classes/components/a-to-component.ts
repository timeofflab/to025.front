import Vue from 'vue';
import {_, LangLabelUtil} from "~/classes/domain/lang/lang-label-util";
import {$v} from "~/classes/utils/var-util";
import {cmdModule, ICmd} from "~/store/cmd";
import {MasterConst} from "~/configs/master-const";
import {sprintf, vsprintf} from "sprintf-js";
import {$d} from "~/classes/utils/date-util";
import WindowUtil from "~/classes/utils/window-util";
import {AppModeUtil} from "~/classes/app/app-mode-util";
import {bodyModule} from "~/store/body";
import {appModule} from "~/store/app";
import TxtUtil from "~/classes/view/txt-util";

export abstract class AToComponent extends Vue {

    // Methods /////
    public langL(label: string): string {
        return label.replace(/%%/g, this.currentLang);
    }

    public sp(...args: any[]): string {
        return sprintf.apply(null, args as any);
    }

    public df(date: any = null, format: string = MasterConst.Date.Y4MDJHM, tz: string = 'Asia/Tokyo'): string {
        return $d.datetimeFormatTz(date, format, tz);
    }

    public p(...args: any[]): any {
        return $v.p.apply(null, args as any);
    }

    public _(...args: any[]): string {
        return _.apply(null, args as any);
    }

    // コンポーネントローカル
    public __(code: string, def: string = '', param: any[] = []): string {
        const key = $v.p(this, 'state.config.lang') + `.${code}`;

        // # - debug
        // const r = _(key, def);
        // console.log('__ > %s, $s(%s)', key, r, def);
        // return r;

        return _(key, def, param);
    }

    public resizedWindow() {
        WindowUtil.resizeWindow();
    }

    public l(path: string): string {
        console.log('AToComponent > ' + `/${LangLabelUtil.lang}${path}`);
        return `/${LangLabelUtil.lang}${path}`;
    }

    public escapeTag(text: string): string {
        return TxtUtil.escapeTag(text);
    }

    // Events //////////////////////////////////////////////////////////////
    // Computed ////////////////////////////////////////////////////////////////////
    public get queue(): ICmd | null {
        return cmdModule.queues.length > 0 ? cmdModule.queues.first() : null;
    }

    public get isAppModeDev(): boolean {
        return AppModeUtil.isDevelop();
    }

    public get isAppModeProd(): boolean {
        return AppModeUtil.isProduction();
    }

    public get bodyClick(): number {
        return bodyModule.bodyClickEventSeq;
    }

    public get currentLang(): string {
        return $v.p(this, 'state.param.lang')
            || appModule.lang
            || LangLabelUtil.lang;
    }

    public get jsv(): string {
        return 'javascript:void(0)';
    }
}
