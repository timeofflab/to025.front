const $ = process.env;
const prod = (process.env.NODE_ENV === 'production');
// const httpPort = prod ? 8081 : 3000;
const httpPort = 3000;

const websiteInfo = {
    url: 'https://test.com/',
    name: '',
    description: '',
    ogImgPath: 'https://test.com/common/img/sns/og.jpg',
    fbAppId: '',
    twitterUserId: '@test',
}

let lang = 'en';
process.argv.map((_) => {
    if (/^--lang=/.test(_)) {
        lang = _.replace(/--lang=/, '');
    }
});


// console.log($);

export default {
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        'nuxt-basic-auth-module',
        [
            '@nuxtjs/google-gtag',
            {
                id: $.GA_OFFICIAL, //あなたのGoogleアナリティクスのプロパティID
                debug: false, //本番環境以外でもGAを有効にしたい場合はtrueに。
            }
        ],
        // /dev以下をビルドから排除する
        '~/modules/dev-exclude.js' // @dev
    ],
    // -------------------------------------------------------------------------------

    /*
    ** Nuxt rendering mode
    ** See https://nuxtjs.org/api/configuration-mode
    */
    ssr: $.NUXT_MODE || true,
    /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
    target: $.NUXT_TARGET,
    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
    head: {
        title: '',
        titleTemplate: '%s｜Show Plain',
        meta: [
            {charset: 'utf-8'},
            {httpEquiv: 'content-language', content: 'ja'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no'},
            {name: 'google', content: 'notranslate'},
            {
                hid: 'description',
                name: 'description',
                content: websiteInfo.description
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: websiteInfo.name
            },
            {
                hid: 'og:site_name',
                property: 'og:site_name',
                content: websiteInfo.name
            },
            {
                hid: 'og:type',
                property: 'og:type',
                content: 'website'
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: websiteInfo.url
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: websiteInfo.description
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: websiteInfo.ogImgPath
            },
            {
                hid: 'fb:app_id',
                property: 'fb:app_id',
                content: websiteInfo.fbAppId
            },
            {
                hid: 'twitter:card',
                property: 'twitter:card',
                content: 'summary_large_image'
            },
            {
                hid: 'twitter:creator',
                property: 'twitter:creator',
                content: websiteInfo.name
            },
            {
                hid: 'twitter:site',
                property: 'twitter:site',
                content: websiteInfo.twitterUserId
            },
            {
                hid: 'twitter:image',
                property: 'twitter:image',
                content: websiteInfo.ogImgPath
            },
            {
                name: 'note:card',
                content: 'summary_large_image'
            }
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'preconnect', href: '//fonts.gstatic.com'},
        ],
        bodyAttrs: {
            class: $.APP_MODE === 'production' ? '' : '-isDev',
        },
        script: [
//             {src: '//fast.fonts.net/jsapi/5d541abc-4b58-47a9-864c-f915a329c0bb.js'},
//             {async: '', defer: '', src: '//assets.pinterest.com/js/pinit.js'},
//             {async: '', src: 'https://cdn.st-note.com/js/social_button.min.js'},
        ],
    },

    /*
    ** Global CSS
    */
    css: [
        {src: '~/assets/scss/official.scss', lang: 'scss'},
    ],
    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [
        '~plugins/official/app',
        '~plugins/boot',
        '~plugins/vue-awesome-swiper',
        '~plugins/official/prism',
        {src: '~plugins/client', ssr: false},
        {src: '~plugins/client/route', ssr: false},
        {src: '~plugins/resize-directive', ssr: false},
        {src: '~plugins/vue2-touch-events', ssr: false},

    ],
    router: {
        middleware: 'nav-move',
        extendRoutes(routes, resolve) {
            routes.push({
                name: 'custom',
                path: '*',
                component: resolve(__dirname, 'pages/error/e404.vue'),
            })
        }
    },
    /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
    components: false,
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxt/typescript-build',
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {},

    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
    build: {
        babel: {
            presets({isServer}) {
                return [
                    [
                        "@nuxt/babel-preset-app", {loose: true},
                    ]
                ]
            },
        },
        terser: {
            terserOptions: {
                compress: {drop_console: ($.CONSOLE_LOG !== 'true')}
            },
        },
    },
    typescript: {
        typeCheck: {
            eslint: false,
            vue: true,
        },
    },
    server: {
        port: $.HTTP_PORT || httpPort, // デフォルト: 3000
        host: $.HTTP_HOST || '0.0.0.0', // デフォルト: localhost
    },
    proxy: {},
    privateRuntimeConfig: {
        debugMode: $.DEBUG_MODE === 'true',
        to985Secret: $.TO985_SECRET,
        instagramBusinessId: $.INSTAGRAM_BUSINESS_ID,
        instagramAccessToken: $.INSTAGRAM_ACCESS_TOKEN,
        instagramFields: $.INSTAGRAM_FIELDS,
    },
    env: {
        APP_TYPE: 'official',
        APP_MODE: $.APP_MODE,
        API_MODE: $.API_MODE || 'axios',
        BASE_URL: $.BASE_URL || '',
        API_BASE_URL: $.API_BASE_URL || 'http://localhost:3000/api/v1',
        API_POSTCODE_URL: $.API_BASE_URL || '',
        GOOGLE_RECAPTCHA_SITE_KEY: $.GOOGLE_RECAPTCHA_SITE_KEY || '',
        STRIPE_PUB_KEY: $.STRIPE_PUB_KEY || '',
        MEDIA_BASE: $.MEDIA_BASE || '',
        // - OFFICIAL
        GA_OFFICIAL: $.GA_OFFICIAL || '',
        LANG: lang,

        TO985_SITE_CD: $.TO985_SITE_CD || '',
        TO985_API_BASE: $.TO985_API_BASE || '',

        INSTAGRAM_API_BASE: $.INSTAGRAM_API_BASE || '',

        TO025_API_BASE: $.TO025_API_BASE || '',
        TO025_UP_FILE_BASE: $.TO025_UP_FILE_BASE || '',
    },
    basic: {
        name: $.AUTH_ID,
        pass: $.AUTH_PW,
        enabled: $.IS_AUTH === 'true' // require boolean value(nullable)
    },
}
