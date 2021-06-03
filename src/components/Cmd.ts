import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {cmdModule, ICmd, QueueStatus} from "~/store/cmd";
import {AToComponent} from "~/classes/components/a-to-component";

const TAG = 'c/cmd';

@Component
export default class Cmd extends AToComponent {
    @Watch('cmds', {deep: true})
    public watchCmds(cmds: ICmd[]) {
        console.log('%s.watchCmds｜', TAG);
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
