import {Mutation, MutationAction, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';
import Img from "~/configs/img.json";
import {$v} from "~/classes/utils/var-util";
import SImgUtil from "~/classes/utils/s-img-util";

const TAG = 'cSImgModule';

export type ImageScaleType = 'x1' | 'x2';

export interface ICSImg {
    id: string;
    src: string;
    thumb: any;
    main: any;
    prepare: boolean;
    ready: boolean;
}

// state's interface
export interface ICSImgModule {
    imgs: ICSImg[]
}

/**
 * SImg Ver 2.0
 */
@Module({dynamic: true, store, name: 'cSImg', namespaced: true})
class Store extends VuexModule implements ICSImgModule {

    private _loadInterval: number | null = null;
    private _imgs: ICSImg[] = [];
    private _loadQueues: string[] = [];

    public get loadInterval(): number | null {
        return this._loadInterval;
    }

    public get imgImfos(): any {
        return Img;
    }

    public get imgs(): ICSImg[] {
        return this._imgs;
    }

    public get loadQueues(): string[] {
        return this._loadQueues;
    }

    @Mutation
    public updateLoadInterval(value: number | null) {
        this._loadInterval = value;
    }

    @Mutation
    public updateImg(value: ICSImg) {
        this._imgs = this._imgs.replaceByKey('id', value).array;
    }

    @Mutation
    public updateImgs(value: ICSImg[]) {
        this._imgs = value;
    }

    @Mutation
    public insertLoadQueue(value: string) {
        this._loadQueues = this._loadQueues.from([value]);
    }

    @Mutation
    public cleanLoadQueue() {
        this._loadQueues = this._loadQueues.filter((_: string) => {
            const c = this._imgs.findByKey('id', _);
            return (!!c && !$v.p(c, 'ready', false));
        });
    }

    //
    @Action
    public async add(src: string) {
        const cid = SImgUtil.hash(src);
        const current = M.imgs.findByKey('id', cid);

        if (!!current) {
            return;
        }

        M.updateImgs(M.imgs.from({
            id: cid,
            src,
            thumb: (() => {
                const img = new Image();
                img.src = SImgUtil.src2Thumb(src);
                img.onload = () => {
                    const main = new Image();
                    main.src = src;
                    main.onload = () => {
                        console.log('%s.main | load', TAG, main.src);
                        const current = M.imgs.findByKey('id', cid);
                        if (!!current) {
                            M.updateImg({
                                ...current,
                                ...{
                                    prepare: true,
                                },
                            });
                        }

                        M.load().then();
                    };
                    const current = M.imgs.findByKey('id', cid);
                    if (!!current) {
                        M.updateImg({
                            ...current!,
                            ...{main},
                        });
                    }
                };
                return img;
            })(),
            main: null,
            prepare: false,
            ready: false,
        }));
        M.insertLoadQueue(cid);
        // console.log('[Ts.add]', TAG, M.imgs);
    }

    @Action
    public async load() {

        if (M.loadInterval !== null) {
            console.log('load() - skip');
            return;
        }

        console.log('load() - regist');
        M.updateLoadInterval(Number(setTimeout(() => {
            M.queue().then();
        }, 300)));
    }

    @Action
    public async queue() {
        if (M.loadQueues.length > 0) {
            console.log('%s.queue() | proc ', TAG);
            const img = M.loadQueues.find((_: string) => {
                const __ = M.imgs.findByKey('id', _);
                return !!__
                    && $v.p(__, 'prepare', false)
                    && !$v.p(__, 'ready', false);
            });

            if (!!img) {
                console.log('%s.queue() | proc > 2', TAG, img);
                await M.ready(img);
            }

            M.cleanLoadQueue();
        }

        if (M.loadQueues.length > 0) {
            setTimeout(() => M.queue(), 200);
        }
    }

    @Action
    public async ready(cid: string) {

        // console.log('%s.ready() | cid=', TAG, cid);

        const current = M.imgs.findByKey('id', cid);
        if (!!current) {
            M.updateImg({
                ...current,
                ...{
                    ready: true,
                },
            } as ICSImg);
        }
    }
}

export const cSImgModule = getModule(Store);

const M = cSImgModule;
