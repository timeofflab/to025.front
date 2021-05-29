import {appModule} from "~/store/app";

export default function (context: any) {
    appModule.incRouteStep();
    // console.log('[MW.nav-move] navigation > step=', appModule.routeStep);
}
