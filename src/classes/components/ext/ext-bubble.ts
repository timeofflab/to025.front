import {AExt} from "~/classes/components/ext/a-ext";

export class ExtBubble extends AExt {

    public bubble: string = '';
    public timer: number = 0;

    public showBubble(name: string = '@') {

        this.bubble = name;
        if (this.timer > 0) {
            window.clearTimeout(this.timer);
        }

        this.timer = window.setTimeout(() => {
            this.bubble = '';
            this.vue.$forceUpdate();
        }, 800);
    }

    public isBubble(name: string = '@'): boolean {
        return this.bubble === name;
    }
}
