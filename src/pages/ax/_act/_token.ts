import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";
import {$v} from "~/classes/utils/var-util";
import {appAuthModule} from "~/store/app/auth";
import WUtil from "~/classes/view/w-util";

const TAG = '/ax';
const state = {
    auth: {} as any,
};

@Component
export default class Token extends AToComponent {

    public state: any = state;

    public async asyncData(ctx: any) {

        const act = $v.p(ctx, 'route.params.act');
        const token = $v.p(ctx, 'route.params.token');

        console.log('%s.asyncData|', TAG, {
            act,
            token,
        });

        const res = await appAuthModule.showAuth({
            act,
            token,
        });

        console.log('%s.asyncData|res > ', TAG, res);

        return {
            state: {
                ...state,
                ...{
                    auth: $v.p(res, 'auth'),
                },
            },
        };
    }

    /**
     *
     */
    public async created() {

        if (!WUtil.isBrowser) {
            return;
        }

        const auth = $v.p(this.state, 'auth');
        if (!!auth) {
            await appAuthModule.login(auth);
        }

        if (appAuthModule.isAuth) {
            await this.$router.push('/my');
        }
    }
}
