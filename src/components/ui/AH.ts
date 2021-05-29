import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {LangLabelUtil} from "~/classes/domain/lang/lang-label-util";
import {$v} from "~/classes/utils/var-util";
import {sprintf} from "sprintf-js";

const TAG = 'ah';

@Component
export default class AH extends Vue {

    @Prop({default: '/'})
    public to: string | object;

    @Prop({default: LangLabelUtil.lang})
    public lang: string;

    @Prop({default: ''})
    public target: string;

    @Prop({default: false})
    public opener: string;

    public mounted() {
        // console.log('[%s] to = ', TAG, this.link);
        return true;
    }

    public get tag(): string {
        return this.isExternal ? 'a' : 'router-link';
    }

    public get isToString(): boolean {
        return !$v.p(this.to, 'path');
    }

    public get link(): string {
        return (this.isExternal) ? this.fullPath
            : sprintf('/%s',
                this.fullPath.replace(/^\//, ''),
            );
    }

    public get qs(): string {
        return $v.isString(this.to)
            // From URL
            ? String(this.to).split('?').slice(1).join()
            // From Path Object
            : $v.tap(null, () => {

                const qs = $v.p(this.to, 'query');
                if (!qs) {
                    return '';
                }

                Object.keys(qs).map((_: string) => {
                    return `${encodeURI(_)}=${encodeURI($v.p(qs, _))}`;
                }).join('&');
            }) as string;
    }

    public get fullPath(): string {
        return this.path
            + ((!!this.qs) ? '?' : '')
            + this.qs;
    }

    public get path(): string {
        return (this.isToString ? this.to : $v.p(this.to, 'path'));
    }

    public get isExternal(): boolean {
        return /^http(s)?:\/\//.test(this.path);
    }

    public get rel(): string | null {
        return !!this.target ?
            (!this.opener ? 'noopener' : '')
            : null;
    }

    public get otarget(): string {
        return (this.isExternal && this.target != '-') ? '_blank' : this.target;
    }
}
