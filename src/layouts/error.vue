<template lang="pug">
    official-main-frame(translate="no")
        .o-base-container
            template(v-if="isScrapArticle404")
                .o-txt-wrapper.-about
                    PageE404

            template(v-else-if="error.statusCode === 404")
                .o-txt-wrapper.-about
                    PageE404

            template(v-else)
                .o-txt-wrapper.-about
                    span.en An error occurred
</template>

<script lang="ts">
import {Component, Prop} from "nuxt-property-decorator";
import PopupLayer from "~/components/popups/PopupLayer";
import Console from "~/components/pages/share/Console";
import {AOfficialLayout} from "~/classes/components/a-official-layout";
import {$v} from "~/classes/utils/var-util";
import {appModule} from "~/store/app";
import PageE404 from "~/components/pages/share/PageE404.vue";

@Component({
    components: {
        PopupLayer,
        Console,
        PageE404,
    }
})
export default class Default extends AOfficialLayout {

    @Prop()
    public error: any;

    public isConsole: boolean = false;

    // Methods ////////////////////////////////////////////////////
    public async created() {
        this.execPageLoading();
    }

    public async mounted() {
        if (this.isScrapArticle404) {
            appModule.updatePageid('scrap');
        }
    }

    // Events ///////////////////////////////////////////////////////
    // Computed /////////////////////////////////////////////////////////////////
    public get isScrapArticle404(): boolean {
        return $v.p(this.error, 'statusCode') === 404 && /^\/scrap\/article\//.test(this.$route.path);
    }
}
</script>
