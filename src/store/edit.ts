import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {EditMode} from "@/configs/master-const";
import {$v} from "@/classes/utils/var-util";
import {ISelect} from "~/classes/app/impl";

export interface IErrorBag {
    name: string;
    messages: string[];
}

export interface IBubble {
    name: string;
    bubble: boolean;
}

export interface IEditSchema {
    name: string;
    type: string;
    title: string;
    required?: boolean;
    maxlength?: number;
    placeholder?: string;
    values?: ISelect[];
    option?: any;
    bubble?: any;
}

export interface IEdit {
    id: string;
    mode: EditMode;
    input: any;
    last: any;
    current: any;
    changes: string[];
    errors: IErrorBag[];

    // bubbleマネジメント
    bubbles?: IBubble[];
    // Formスキーマ
    schemas?: IEditSchema[];
    // classValidator オブジェクト
    validator?: any;
}

export interface IEditRequest {
    id: string;
    mode?: EditMode;
    input?: any;
    last?: any;
    current?: any;
    changes?: string[];
    errors?: IErrorBag[];
    bubbles?: IBubble[];
    schemas?: IEditSchema[];
    validator?: any;
}

// state's interface
export interface IEditModule {
    edits: IEdit[];
}

@Module({dynamic: true, store, name: 'edit', namespaced: true})
class Store extends VuexModule implements IEditModule {

    private _template: IEdit = {
        id: '@',
        mode: EditMode.Add,
        input: {},
        last: {},
        current: {},
        changes: [],
        errors: [],
    };
    private _edits: IEdit[] = [{
        id: '@',
        mode: EditMode.Add,
        input: {},
        last: {},
        current: {},
        changes: [],
        errors: [],
    }];

    // Getters ///////////////////////////////////////////
    public get template(): IEdit {
        return M._template;
    }

    public get edits(): IEdit[] {
        return M._edits;
    }

    // Mutations //////////////////////////////////////////
    @Mutation
    public updateEdit(value: IEditRequest) {
        // console.og('edits > ', value);
        const input = M.edits.findByKey('id', value.id) || M.edits[0];

        this._edits = M.edits.filter((_: IEdit) => _.id !== value.id).concat({
            ...input,
            ...value,
        });
    }

    @Mutation
    public updateError(param: {
        id: string,
        name: string,
        messages: string[],
    }) {

        const edit = this._edits.findByKey('id', param.id);
        if (!edit) {
            // console.og('editModule.updateError() > no edit', param);
            return;
        }

        const errors = $v.tap(edit.errors.filter((_: IErrorBag) => _.name !== param.name), (_: IErrorBag[]) => {
            if (param.messages.length > 0) {
                return _.concat({
                    name: param.name,
                    messages: param.messages,
                });
            } else {
                return _;
            }
        });

        this._edits = this._edits.filter((_: IEdit) => _.id !== param.id)
            .concat([{
                ...edit,
                ...{
                    errors,
                },
            }]);
    }

    // Actions /////////////////////////////////////////////////
    @Action
    public async find(id: string): Promise<IEdit> {
        return M.edits.findByKey('id', id) || M.edits[0];
    }

    @Action
    public async input(param: {
        id: string,
        input: any,
    }) {
        const target = await M.find(param.id);
        M.updateEdit({
            id: param.id,
            input: {
                ...target.input,
                ...param.input,
            },
            last: {...this.input},
        });
    }
}

export const editModule = getModule(Store);

const M = editModule;
