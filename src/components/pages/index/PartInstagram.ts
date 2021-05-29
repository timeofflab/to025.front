import {Vue, Component, Prop, Watch} from 'nuxt-property-decorator';
import {AOfficialComponent} from "~/classes/components/a-official-component";
import {cInstagramModule, InstagramMediaPost} from "~/store/c/instagram";
import {$v} from "~/classes/utils/var-util";
import {DummyInstagram} from "~/classes/api/dummy/instagram";

const TAG = 'PartInstagram';

@Component
export default class PartInstagram extends AOfficialComponent {
    // Methods ////////////////////////////////////////////////
    public imgLink(item: InstagramMediaPost): string {
        return $v.p(item, 'media_type') === 'VIDEO'
            ? $v.p(item, 'thumbnail_url')
            : $v.p(item, 'media_url')
    }

    // Computed //////////////////////////////////////////////
    public get hasPosts(): boolean {
        return this.posts.length > 0;
    }

    public get posts(): any {
        return cInstagramModule.posts;
    }

    public get isViewIFrame(): any {
        return !this.isDummy || this.isAppModeProd;
    }

    // Base //////////////////////////////////////////////////
    public async mounted() {
        if (this.isDummy) {
            await this.initDummy();
        }
    }

    public async initDummy() {
        cInstagramModule.updatePosts(DummyInstagram.posts as any[]);
        cInstagramModule.updatePaging(DummyInstagram.paging);
        cInstagramModule.updateLoaded(true);
    }
}
