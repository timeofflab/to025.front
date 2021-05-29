import {AppCmd} from "~/configs/app-cmd";
import {cmdModule, ICmd} from "~/store/cmd";
import {$v} from "~/classes/utils/var-util";

export class CmdUtil {
    public static cmd(cmd: AppCmd | AppCmd[] = []): ICmd | null {
        const cc = ((Array.isArray(cmd)) ? cmd : [cmd]).map((_: AppCmd) => _.toString());
        return $v.tap(
            cmdModule.queues.filter((_: ICmd) => cc.indexOf(_.cmd) >= 0),
            (cmds: ICmd[] | null) => {
                return (Array.isArray(cmds) && cmds.length) > 0 ? (cmds as Array<ICmd>).first() : null;
            });
    }
}
