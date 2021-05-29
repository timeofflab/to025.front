import {Mutation, MutationAction, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';
import {$v} from "~/classes/utils/var-util";
import {vsprintf} from "sprintf-js";
import {DateFormat} from "~/configs/master-const";

// state's interface
export interface IDebugModule {
    code: string;
    logs: string[];
}

@Module({dynamic: true, store, name: 'debug', namespaced: true})
class Store extends VuexModule implements IDebugModule {
    private _code: string = '';
    private _logs: string[] = [
        `[${$v.datetimeFormat(null, DateFormat.Full)}] start -`
    ];

    // Getters ////////////////////////////////////////
    public get logs() {
        return this._logs;
    }

    public get code(): string {
        return this._code;
    }

    // Mutations ////////////////////////////////////////
    @Mutation
    public updateCode(value: string) {
        this._code = value;
    }

    @Mutation
    public log(value: number | string | any[] | object) {

        const append = [];
        const prefix = `[${$v.datetimeFormat(null, DateFormat.Full)}]`;
        if ($v.isArray(value)) {
            const av = (value as any[]).from();
            append.push(vsprintf(prefix + av[0], av.length > 0 ? av.slice(1) : []));
        } else if ($v.isObject(value)) {
            append.push(prefix + JSON.stringify(value));
        } else {
            append.push(prefix + String(value));
        }

        const ll = $v.tap(this._logs.length - 300, (_: number) => {
            return _ < 0 ? 0 : _;
        });
        this._logs = this._logs.from(append).slice(ll);
    }

    @Mutation
    public clear() {
        this._logs = [`[${$v.datetimeFormat(null, DateFormat.Full)}] start -`];
    }
}

export const debugModule = getModule(Store);

const M = debugModule;
