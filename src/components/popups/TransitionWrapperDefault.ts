import {Vue, Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class TransitionWrapperDefault extends Vue {

    public async onAnimatedOpen() {
        this.$emit('animatedOpen');
    }

    public async onAnimatedClose() {
        this.$emit('animatedClose');
    }
}
