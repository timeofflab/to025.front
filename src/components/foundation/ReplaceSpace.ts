import {Component, Prop, Vue} from '@/node_modules/nuxt-property-decorator';

@Component
export default class ReplaceSpace extends Vue {
    @Prop({default: '@'})
    public c: string;

    @Prop({default: ''})
    public s: string;

    @Prop({default: 'span'})
    public tag: string;

    public get out(): string {
        return this.s.replace(/[ 　]+/, '<span class="space"></span>');
    }
}
