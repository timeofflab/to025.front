import {VuexModule, getModule, Module, Mutation, Action} from 'vuex-module-decorators';
import store from '@/store';
import {$v} from "@/classes/utils/var-util";

const PKEY = 'id';

let seq = 0;

export enum QueueStatus {
    Ready = 0,
    Success = 1,
    Failed = 2,
}

export enum QueueResultCode {
    Success = 200,
    Error = 500,
}

export interface ICmdResult {
    sender: string;
}

export interface ICmsResult {
    result: QueueStatus;
    // 結果コード: 200 > Success, 400 > Error
    code: number;
    // 実行メッセージ
    message: string;
    // 実行日時UnixTime
    executedAt: number;
}

export interface ICmd {
    // コマンドID
    id: number;
    // コマンド名
    cmd: string;
    // チャンネル
    channel: string;
    // 最終ステータス
    status: QueueStatus;
    // コマンドリクエスト
    request: any;
    // コマンドリザルト
    results: ICmdResult[];
    // 作成Unixtime
    createdAt: number;
    // 実行Unixtime
    queuedAt: number;
}

// state's interface
export interface ICmdStore {
    queues: ICmd[];
    trashes: ICmd[];
}

@Module({dynamic: true, store, name: 'cmd', namespaced: true})
class Store extends VuexModule implements ICmdStore {

    private _queues: ICmd[] = [];
    private _trashes: ICmd[] = [];

    // Getters ////
    public get queues(): ICmd[] {
        return this._queues;
    }

    public get trashes(): ICmd[] {
        return this._trashes;
    }

    // Mutations ////
    @Mutation
    public updateQueues(value: ICmd[]) {
        this._queues = value;
    }

    @Mutation
    public updateQueue(value: ICmd) {
        this._queues = this._queues.replaceByKey(PKEY, value).array;
    }

    @Mutation
    public addQueue(value: ICmd) {
        this._queues = Array.from(this._queues).concat([value]);
    }

    // 終了済みに移動
    @Mutation
    public trashQueue(id: number) {

        const q = this._queues.findByKey(PKEY, id);
        if (!q) {
            return;
        }

        this._trashes = this._trashes.from({...q});
        M.removeQueue(q.id);
    }

    // 終了済みに移動
    @Mutation
    public removeQueue(id: number) {
        this._queues = this._queues.rejectByKey(PKEY, id);
    }

    // Actions ///
    /**
     * コマンド作成 & 登録
     * @param p
     */
    @Action
    public async registCmd(p: {
        cmd: string,
        channel?: string,
        request?: any,
    }): Promise<ICmd> {

        const cmd = await M.createCmd(p);
        M.addQueue(cmd);

        return cmd;
    }

    /**
     * コマンド実行結果処理 & ゴミ箱
     * @param p
     */
    @Action
    public async commitCmd(p: {
        id: number,
        result: ICmdResult,
        queuedAt?: number
    }): Promise<void> {

        await M.resultCmd(p);
        M.trashQueue(p.id);
    }

    /**
     * コマンド作成
     * @param p
     */
    @Action
    public async createCmd(p: {
        cmd: string,
        channel?: string,
        request?: any,
    }): Promise<ICmd> {

        return {
            id: seq++,
            cmd: p.cmd,
            channel: $v.p(p, 'channel', '@'),
            request: p.request,
            status: QueueStatus.Ready,
            createdAt: $v.now().unix(),
            results: [],
            queuedAt: 0,
        };
    }

    /**
     * コマンド実行結果処理
     * @param p
     */
    @Action
    public async resultCmd(p: {
        id: number,
        result: ICmdResult,
        queuedAt?: number
    }): Promise<void> {

        const cmd = M.queues.findByKey(PKEY, p.id);
        if (!cmd) {
            return;
        }

        M.updateQueue({
            ...cmd,
            ...{
                results: cmd.results.from(p.result),
                queuedAt: $v.p(p, 'queuedAt', $v.now().unix()),
            },
        });
    }
}

export const cmdModule = getModule(Store);

const M = cmdModule;
