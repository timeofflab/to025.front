import {appModule} from "~/store/app";
import {cSImgModule} from "~/store/c/s-img";

export default function (context: any) {
    cSImgModule.updateLoadInterval(null);
    setTimeout(() => {
        appModule.incRouteStep();
    }, 600);
    // console.log('[MW.nav-move] navigation > step=', appModule.routeStep);
}
