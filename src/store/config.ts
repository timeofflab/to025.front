import {VuexModule, getModule, Module, Mutation} from 'vuex-module-decorators';
import store from '@/store';
import {$v} from "@/classes/utils/var-util";

// state's interface
export interface IConfig {
    id: string;
    value: any;
}

// 時間コマ設定
export interface IConfigModule {
    configs: IConfig[];
    scheduleTimes: number[];
}

// 時間表記補正用設定
export interface IConfigScheduleTimeCorrect {
    time: number;
    correct: number;
}

@Module({dynamic: true, store, name: 'config', namespaced: true})
class Store extends VuexModule implements IConfigModule {

    private _configs: IConfig[] = [
        {
            id: 'scheduleTimes',
            value: [
                9, 10, 11, 13, 14, 15, 16, 17,
            ],
        },
        {
            id: 'scheduleTimeCorrects',
            value: [
                // {time: 13, correct: 30},
            ],
        },
    ];

    // Getters //////////////////////////
    public get configs(): IConfig[] {
        return this._configs;
    }

    public get scheduleTimes(): number[] {
        return $v.tap(null, () => {
            const r = this._configs.findByKey('id', 'scheduleTimes');
            return !!r ? r.value as any : [];
        });
    }

    // corrects
    public get scheduleTimeCorrects(): IConfigScheduleTimeCorrect[] {
        return $v.tap(null, () => {
            const r = this._configs.findByKey('id', 'scheduleTimeCorrects');
            return !!r ? r.value as any : [];
        });
    }

    // Mutations ////////////////////////
    @Mutation
    public updateConfigs(conigs: IConfig[]) {
        this._configs = conigs;
    }
}

export const configModule = getModule(Store);

const M = configModule;
