// import {AExt} from "~/classes/components/ext/a-ext";
// import {CSRFType} from "~/configs/master-const";
// import {appSystemModule} from "~/store/app/system";
// import {$v} from "~/classes/utils/var-util";
// import {SystemHelloCsrf} from "~/classes/api/client/system";
// import {cRecaptchaV3Module} from "~/store/c/recaptcha-v3";
//
// const TAG = 'ExtCsrf';
//
// export class ExtCsrf extends AExt {
//
//     public submit: boolean = false;
//     public timer: number | null;
//     public timerInterval: number = 1000 * 60 * 15;   // 15分
//
//     public async hello(): Promise<void> {
//
//         this.submit = false;
//         if (!this.accept) {
//             console.log(`[${TAG}}] Accept is NULL`);
//             setTimeout(() => {
//                 this.hello().then();
//             }, 1500);
//             return;
//         }
//
//         await appSystemModule.hello({
//             accept: this.accept,
//         });
//     }
//
//     public releaseInterval() {
//         if (!this.timer) {
//             return;
//         }
//         window.clearInterval(this.timer);
//     }
//
//     public async start() {
//
//         await this.hello();
//
//         this.releaseInterval();
//         this.timer = window.setInterval(() => {
//             this.hello().then();
//         }, this.timerInterval);
//     }
//
//     public exit() {
//         this.releaseInterval();
//     }
//
//     public commit() {
//         this.submit = true;
//     }
//
//     public async captcha(): Promise<string> {
//         return !this.hasRecaptcha ? '' : await cRecaptchaV3Module.captcha();
//     }
//
//     public async inputCaptcha(base: any = {}, name: string = 'captcha'): Promise<any> {
//         const captcha = await this.captcha();
//         return $v.put(base || {}, name, captcha);
//     }
//
//     // Computed/Getters ---------------------------------------------------
//
//     public get accept(): CSRFType {
//         return $v.p(this.vue, 'state.config.csrf') as CSRFType;
//     }
//
//     public get csrf(): SystemHelloCsrf | null {
//         return appSystemModule.csrfs.findByKey('accept', this.accept);
//     }
//
//     public get token(): string {
//         return $v.p(this.csrf, 'token');
//     }
//
//     public get hasRecaptcha(): boolean {
//         return !this.submit && $v.p(this.csrf, 'captcha') === 'on';
//     }
// }
