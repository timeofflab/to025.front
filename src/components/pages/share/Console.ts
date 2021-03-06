import {Component, Prop, Vue} from 'vue-property-decorator';
import {AToComponent} from "~/classes/components/a-to-component";
import {appModule} from "~/store/app";
import {debugModule} from "~/store/debug";
import {uploadModule} from "~/store/upload";

@Component
export default class Console extends AToComponent {

    @Prop({default: false})
    public active: boolean = false;

    public onToggle() {
        appModule.updateIsConsole(!this.active);
    }

    public get logs(): string[] {
        return debugModule.logs;
    }

    // Debugs ////
    public get uploads(): any[] {
        return uploadModule.uploads;
    }
}


