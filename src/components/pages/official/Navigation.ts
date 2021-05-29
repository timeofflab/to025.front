import {Component, Watch, Prop} from "nuxt-property-decorator";
import {AOfficialComponent} from "~/classes/components/a-official-component";
// import {scrollModule} from '@/store/scroll';
import WindowUtil from "~/classes/utils/window-util";
import {MainConst} from "~/configs/main-const";
// import {appModule} from '@/store/app';
// import {officialModule} from "~/store/official";

const TAG = 'Navigation';
const cid = 'official';

const state = {
    config: {
        lang: 'components.navigation',
    },
};

@Component
export default class Navigation extends AOfficialComponent {

//     @Prop({default: 'mei'})
//     public aid: string;
// 
    public scrollCid: string = 'official';
    public mc: any = MainConst;
    public isActive: boolean = false;
    public navContentHeight: number = 0;
    
    
    // Methods ////////////////////////////////////////////////////////////
    
    public onClickScrollTo(target: string) {
        
        this.closeNav();
        
        const el: any = document.getElementById(target);
        
        if(!el){
            return
        }
                    
        WindowUtil.scrollTo('official', el);
    }
        
    public onClickToggle() {
        this.isActive = !this.isActive;
            
        setTimeout(() => {
            const targetElement: any = this.$refs.navOpenContent as HTMLElement;
            if (!targetElement) { return; }
            this.navContentHeight = targetElement.offsetHeight;
        }, 600);
    }
    
    public closeNav() {
        this.isActive = false;
    }    
    
    
    // Computed ////////////////////////////////////////////////////////////
    
    public get styleNavContent(): any {
        return {
            height: `${this.navContentHeight / 10}rem`,
        }
    }
    
    
    
}
