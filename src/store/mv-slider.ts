import {Mutation, MutationAction, Action, VuexModule, getModule, Module} from 'vuex-module-decorators';
import store from '@/store';

// state's interface
export interface IMvSliderModule {

    ready: boolean;
	length: number;
	active: number;
	exActive: number;
	activeType: string;
	activeStyle: string;
	on: boolean;
// 	link: string;
// 	styleLink: any;

	loop: boolean;
	autoplay: boolean;
	autoplayState: boolean;
	timer: any;
    isFirst: boolean;
    isLast: boolean;
}

@Module({dynamic: true, store, name: 'mvSlider', namespaced: true})
class Store extends VuexModule implements IMvSliderModule {

    public ready: boolean = false;
    public length: number = 0;
	public active: number = 0;
	public exActive: number = 0;
	public activeType: string = '';
	public activeStyle: string = '';
    public on: boolean = false;
// 	public link: string = '';
// 	public styleLink: any = {};

	public loop: boolean = true;
	public autoplay: boolean = true;
	public autoplayState: boolean = false;
    public timer: any;
    public isFirst: boolean = true;
    public isLast: boolean = false;

    // Mutations ////////////////////////////////////////////
    @Mutation
    public updateReady(value: any) {
        this.ready = value;
    }

    @Mutation
    public updateLength(value: any) {
        this.length = value;
    }

//     @Mutation
//     public updateLink(value: any) {
//         this.link = value;
//     }
//
//     @Mutation
//     public updateStyleLink(value: any) {
//         this.styleLink = value;
//     }
    @Mutation
    public updateOn(value: any) {
        this.on = value;
    }

    @Mutation
    public updateActiveType(value: any) {
        this.activeType = value;
    }

    @Mutation
    public updateActiveStyle(value: any) {
        this.activeStyle = value;
    }

    @Action
    public setActives(value: any) {
        this.updateExActive(this.active);
        this.updateActive(value);
        //console.log(`me: ${this.exActive} / new: ${value}`);
    }

    @Mutation
    public updateActive(value: any) {
        this.active = value;
    }

    @Mutation
    public updateExActive(value: any) {
        this.exActive = value;
    }

    @Mutation
    public updateLoop(value: any) {
        this.loop = value;
    }

    @Mutation
    public updateIsFirst(value: any) {
        this.isFirst = value;
    }

    @Mutation
    public updateIsLast(value: any) {
        this.isLast = value;
    }

    @Mutation
    public updateAutoplay(value: any) {
        this.autoplay = value;
    }

    @Mutation
    public updateAutoplayState(value: any) {
        this.autoplayState = value;
    }

    @Mutation
    public updateTimer(value: any) {
        this.timer = value;
    }

    @Action
    public stopTimer() {
        clearInterval(this.timer);
    }


    @Action
    public nextActive() {

        if (this.length <= (this.active + 1)) {
            this.setActives(0);

        } else {
            this.setActives(this.active + 1);
        }
    }

    @Action
    public prevActive() {

        if ((this.active - 1) < 0) {
            this.setActives(this.length - 1);

        } else {
            this.setActives(this.active - 1);

        }
    }

}

export const mvSliderModule = getModule(Store);

const M = mvSliderModule;
