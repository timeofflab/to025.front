import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {cmdModule, ICmd, QueueStatus} from "~/store/cmd";

const TAG = 'c/cmd';

@Component
export default class Cmd extends Vue {
    @Watch('cmds')
    public watchCmds(cmds: ICmd[]) {
        if (cmds.length > 0) {

            console.log('[%s.watchCmd()]', TAG, this.cmds);
            // console.log('[%s] - boot');
            this.$nextTick(() => {
                this.clean();
            });
        }
    }

    public clean() {
        cmdModule.queues.map((_: ICmd) => _.id).map((_: number) => {
            cmdModule.removeQueue(_);
        });
    }

    public get cmds(): ICmd[] {
        return cmdModule.queues;
    }
}
