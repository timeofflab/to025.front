import {DirectiveOptions} from 'vue';

const directive: DirectiveOptions = {
    // inserted(el: HTMLElement, binding: any) {
    //     let f = ((evt: any) => {
    //         if (binding.value(evt, el)) {
    //             window.removeEventListener('resize', f);
    //         }
    //     });
    //     window.addEventListener('resize', f);
    // }
};

export default directive;
