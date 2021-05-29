import {loadingModule} from "~/store/loading";
import {$v} from "~/classes/utils/var-util";

const CN = 'LoadingUtil';

export class LoadingUtil {

    private static readonly _throttle = 800;

    public static isLoading(id: string = '@'): boolean {
        return !!loadingModule.loadings.findByKey('id', id);
    }

    public static async loadAsync(cb: () => Promise<void>, throttle: number = 800, id: string = '@'): Promise<void> {

        if (self.isLoading(id)) {
            return;
        }

        const t = $v.datetime();
        loadingModule.updateProgress({
            id
        });

        await cb();

        const diffSec = $v.datetime().diff(t, 'milliseconds');
        if (diffSec >= throttle) {
            self.complete();
        } else {
            const w = throttle - diffSec;
            console.log('[%s} interval > diff=%s wait=%s', CN, diffSec, w);
            setTimeout(self.complete, w);
        }
    }

    public static complete(id: string = '@') {
        loadingModule.updateProgress({
            id,
            progress: 100,
        });
    }

    public static start(id: string = '@') {
        loadingModule.updateProgress({
            id
        });
    }
}

const self = LoadingUtil;
