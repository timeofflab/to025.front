export interface IFaq {
    title: string;
    inner: string;
}

export interface IAppOfficialBlogGallery {
    no?: number;
    img: string;
    link?: string;
    lang?: {
        [key: string]: {
            alt?: string;
            title?: string;
        },
    },
}
