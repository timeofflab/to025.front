import {AToComponent} from "~/classes/components/a-to-component";
import {$v} from "~/classes/utils/var-util";

export class AInputComponent extends AToComponent {

    public cid: string;
    public emptyIsNull: boolean = true;
    public parentEmit: boolean = true;

    public adaptInput(e: any): any {
        const name = e.target.name;
        const value = $v.tap(e.target.value, (v: any) => {
            if ($v.isEmpty(v)) {
                return this.emptyIsNull ? null : '';
            } else {
                return v;
            }
        });

        return {
            name,
            value,
        };
    }
}
