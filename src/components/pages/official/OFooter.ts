import {Component, Watch, Prop} from "nuxt-property-decorator";
import {AOfficialComponent} from "~/classes/components/a-official-component";
// import {scrollModule} from '@/store/scroll';
// import {appModule} from '@/store/app';
// import {officialModule} from "~/store/official";
import WindowUtil from "~/classes/utils/window-util";
import {MainConst} from "~/configs/main-const";

const TAG = 'Footer';
const cid = 'official';

const state = {
    config: {
        lang: 'components.footer',
    },
};

@Component
export default class OFooter extends AOfficialComponent {

    public mc: any = MainConst;
    public scrollCid: string = 'official';

    // Methods ////////////////////////////////////////////////////////////
    
    public onClickScrollTo(target: string) {
        
        const el: any = document.getElementById(target);
        
        //console.log(el);
        
        if(!el){
            return
        }
                    
        WindowUtil.scrollTo('official', el);
    }
    
    
}
