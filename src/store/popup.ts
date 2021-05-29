import {VuexModule, getModule, Module, Mutation, Action} from 'vuex-module-decorators';
import store from '@/store';
import {$v} from "~/classes/utils/var-util";

export enum PopupModule {
    Alert = 'alert',
    Confirm = 'confirm',
    Privacy = 'privacy',
    ScrapSearch = 'scrap-search',
    ServiceNotify = 'serviceNotify',
}

export enum PopupState {
    Prepare = 'prepare',
    Open = 'open',
    Close = 'close',
    Closed = 'closed',
}

export interface IPopup {
    id: string;
    idx: number;
    component: string;
    state: PopupState;
    option: any;
    result: any;
}

export interface IPopupRequest {
    id: string;
    component?: string;
    idx?: number;
    option?: any;
    result?: any;
}

// state's interface
export interface IPopupModule {
    idx: number;
    popups: IPopup[];
}

@Module({dynamic: true, store, name: 'popup', namespaced: true})
class Store extends VuexModule implements IPopupModule {

    private _idx: number = 1;
    private _popups: IPopup[] = [];

    // Getters //////////////////////////////////////////////////////////////////
    public get idx(): number {
        return this._idx;
    }

    public get popups(): IPopup[] {
        return this._popups.filter((_: IPopup) => !!_.component)
            .sort((a: IPopup, b: IPopup) => a.idx < b.idx ? 1 : -1);
    }

    @Mutation
    public incIdx() {
        this._idx += 1;
    }

    @Mutation
    public updateIdx(value: number) {
        this._idx = value;
    }

    @Mutation
    public update(value: IPopup) {
        this._popups = this._popups.replaceByKey('id', value, true).array
    }

    @Mutation
    public patch(value: IPopupRequest) {

        const current = this._popups.findByKey('id', value.id);
        if (!current) {
            return;
        }

        const up = {
            ...current,
            ...value,
            ...{
                option: {
                    ...$v.p(current, 'option') || {},
                    ...$v.p(value, 'option') || {},
                },
            },
        };

        M.update(up as IPopup);
    }

    @Mutation
    public remove(value: string) {
        this._popups = this._popups.filter((_: IPopup) => (_.id !== value));
    }

    @Action
    public async open(req: IPopupRequest): Promise<void> {
        M.update({
            id: $v.p(req, 'id'),
            idx: M.idx + 1,
            component: $v.p(req, 'component') || 'div',
            state: PopupState.Prepare,
            option: $v.p(req, 'option') || {},
            result: null,
        });
        M.incIdx();
    }

    @Action
    public async close(id: string | null = null): Promise<void> {

        const p = (!!id) ? M.popups.findByKey('id', id)
            : (M.popups.length > 0 ? M.popups.first() : null);

        if (!p) {
            return;
        }

        console.log('popupModule.close() >', p);

        M.update({
            ...p,
            ...{
                state: PopupState.Close,
            },
        });
    }

    @Action
    public async clean(): Promise<void> {
        const npopups = M.popups.filter((_: IPopup) => _.state === PopupState.Closed);
        if (npopups.length > 0) {
            npopups.map((_: IPopup) => {
                M.remove(_.id);
            });
        }

        M.updateIdx(this.popups.length > 0 ? this.popups[0].idx + 1 : 1);
    }
}

export const popupModule = getModule(Store);

const M = popupModule;
