import WindowUtil from "~/classes/utils/window-util";

export class Page {
    public static scrollTo(target: string) {
        const el: any = document.getElementById(target);

        //console.log(el);

        if (!el) {
            return;
        }

        WindowUtil.scrollTo('official', el);
    }

    public static scrollToContact() {
        self.scrollTo('contact');
    }
}


const self = Page;
