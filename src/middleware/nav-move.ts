import {appModule} from "~/store/app";
import {cSImgModule} from "~/store/c/s-img";

const TAG = 'MW.nav-move';

export default async function (context: any) {
    cSImgModule.updateLoadInterval(null);
    setTimeout(() => {
        appModule.incRouteStep();
    }, 600);
    // console.log('[MW.nav-move] navigation > step=', appModule.routeStep);
}
