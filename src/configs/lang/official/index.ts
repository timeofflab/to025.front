import {LangError, LangValidate} from "~/configs/lang/share";

export const LANG_OFFICIAL = {
    ja: {
        base: {
            name: 'Timeoff',
        },
        link: {
            facebook: 'https://www.facebook.com/TimeOffLab',
        },
        pages: {
            index: {
                title: '',
                description: 'タイムオフは札幌を拠点とするプロダクトデザインスタジオです。 身の周りに置きたくなるデザイン、悩みを解決してくれる機能。 どちらも叶えてくれるプロダクトをつくるために、アプリケーションなどのデジタル領域と、アイデンティティなどのアナログ領域を横断したものづくりをおこなっています。 ',
            },
            about: {
                title: 'About us',
                description: 'タイムオフは札幌を拠点とするプロダクトデザインスタジオです。 身の周りに置きたくなるデザイン、悩みを解決してくれる機能。 どちらも叶えてくれるプロダクトをつくるために、アプリケーションなどのデジタル領域と、アイデンティティなどのアナログ領域を横断したものづくりをおこなっています。 ',
            },
            news: {
                title: 'News',
                description: '札幌のプロダクトデザインスタジオ Timeoff(タイムオフ)のニュースページです。 ',
            },
            scrap: {
                index: {
                    title: 'Scrap',
                    description: '札幌のプロダクトデザインスタジオ Timeoff(タイムオフ)のブログページです。 ',
                },
            },
        },
        validate: LangValidate.ja,
        error: LangError.ja,
    },
    en: {
        pages: {
            index: {
                title: '',
                description: '',
            },
        },
        validate: LangValidate.en,
        error: LangError.en,
    }
}
