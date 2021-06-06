import {appAuthModule} from "~/store/app/auth";
import {$v} from "~/classes/utils/var-util";
import WUtil from "~/classes/view/w-util";

const TAG = 'palugin.route';

export default async (ctx: any) => {
    ctx.app.router.beforeEach(async (to: any, from: any, next: any) => {

        console.log('%s.() | start', TAG);

        await appAuthModule.init();

        const path = $v.p(ctx, 'route.path');
        if (!appAuthModule.isAuth) {
            console.log('%s | no auth', TAG);
            if (/^\/my/.test(path)) {
                window.location.href = '/';
                return;
            }
        } else {
            console.log('%s | is auth', TAG);
        }

        next();
    });
}
