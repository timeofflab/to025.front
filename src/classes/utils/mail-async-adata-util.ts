import {$v} from "~/classes/utils/var-util";

const TAG = 'MailASyncDataUtil';

export class MailASyncDataUtil {
    /**
     *
     * @param ctx
     * @param state
     */
    public static load(ctx: any, state: any = {}) {
        return {
            state: {
                ...state,
                ...{
                    param: self.param(ctx, $v.p(state, 'param') || {}),
                }
            }
        }
    }

    public static param(ctx: any, base: any = {}) {

        const params = String($v.p(ctx, 'route.params.lang') || $v.p(base, 'lang')).split(',');

        // start:mの場合はqueryStringが取得できない
        // console.log('[%s] param() > * ', TAG, ctx);
        // console.log('[%s] param() > ', TAG, $v.p(ctx, 'route.query'), $v.p(ctx, 'req.url'));
        // console.log('[%s] param() > route.params > ', TAG, $v.p(ctx, 'route.params'));
        // console.log('[%s] param() > route.query > ', TAG, $v.p(ctx, 'route.query'));
        return {
            ...base,
            ...{
                lang: params[0],
                view: $v.p(ctx, 'route.query.view') || $v.p(params, '1'),
            },
        };
    }
}

const self = MailASyncDataUtil;
