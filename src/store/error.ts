import {Mutation, MutationAction, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';
import {IErrorBag} from "@/store/edit";
import {$v} from "@/classes/utils/var-util";

export interface IHttpError extends IError {
    statusCode: number;
}

export interface IError {
    id: string;
    code: string;
    message?: string;
    messages?: IErrorBag[],
    ext?: any;
    createdAt: string;
}

export interface IErrorRequest {
    id?: string;
    code: string;
    message?: string;
    ext?: any;
    createdAt?: string;
}

export interface IErrorModule {
    errors: IError[];
}

const genID = (depth: number = 0): string => {

    if (depth > 10) {
        throw Error('ID generate Exception');
    }

    const id = $v.rndchars(5);

    if (!!M.errors.findByKey('id', id)) {
        return genID(depth + 1);
    } else {
        return id;
    }
}

@Module({dynamic: true, store, name: 'error', namespaced: true})
class Store extends VuexModule implements IErrorModule {

    private _histories: number[] = [];
    private _e401: IError | null = null;
    private _errors: IError[] = [];

    // Getters ////////////////////////////////
    public get histories(): number[] {
        return this._histories;
    }

    public get historiesDesc(): number[] {
        return this._histories.from().reverse();
    }

    public get lastHistory(): number {
        return M.historiesDesc.length > 0 ? M.historiesDesc[0] : 0;
    }

    public get e401(): IError | null {
        return this._e401;
    }

    public get errors(): IError[] {
        return this._errors;
    }

    public get lastError(): IError | null {
        return this._errors.length > 0 ? this._errors.last() : null;
    }


    // Mutations ////////////////////////////////////////////////////
    @Mutation
    public addHistory(code: number = 200) {
        const base = this._histories.from(code);
        this._histories = (base.length > 5) ? base.slice(base.length - 5) : base;
    }

    @Mutation
    public updateE401(value: IError | null) {
        this._e401 = value;
    }

    @Mutation
    public updateHistories(code: number[]) {
        this._histories = code.from();
    }

    @Mutation
    public updateErrors(value: IError[]) {
        this._errors = value;
    }

    @Mutation
    public updateError(value: IError) {
        this._errors = this._errors.replaceByKey('id', value).array;
    }

    @Mutation
    public addError(value: IErrorRequest): string {
        const id = (!!value.id) ? value.id : genID();
        this._errors = this._errors.replaceByKey('id', value).array;

        return id;
    }
}

export const errorModule = getModule(Store);

const M = errorModule;
