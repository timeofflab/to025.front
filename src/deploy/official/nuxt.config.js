const $ = process.env;
const prod = (process.env.NODE_ENV === 'production');
const httpPort = prod ? 8081 : 3000;

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
        // /dev以下をビルドから排除する
        // - production
        // '~/modules/dev-exclude.js',
    ],
    // -------------------------------------------------------------------------------

    /*
    ** Nuxt rendering mode
    ** See https://nuxtjs.org/api/configuration-mode
    */
    mode: 'universal',
    /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
    target: 'server',
    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
    head: {
        title: '札幌のプロダクトデザインチーム',
        titleTemplate: 'TimeOff | %s',
        meta: [
            {charset: 'utf-8'},
            {httpEquiv: 'content-language', content: 'ja'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no'},
            {
                hid: 'description',
                name: 'description',
                content: '無料でつかえる待合室の3密回避ソフト。 すぐに病院や薬局、その他お店で今すぐご利用になれます。 来訪者が好きな場所で待てるようになり、待合室の混雑を解消します。'
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: '無料でつかえる待合室の3密回避ソフト | どこでも待合室'
            },
            {
                hid: 'og:site_name',
                property: 'og:site_name',
                content: '無料でつかえる待合室の3密回避ソフト | どこでも待合室'
            },
            {
                hid: 'og:type',
                property: 'og:type',
                content: 'website'
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: 'https://dokodemo.app/ja/'
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content: '来訪者が好きな場所で待てるようになり、待合室の3密を回避します。 インストール不要ですぐに病院や薬局、その他お店でご利用になれます。 '
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: 'https://dokodemo.app/common/sns/ogp-facebook.png'
            },
            {
                hid: 'fb:app_id',
                property: 'fb:app_id',
                content: '312946639810422'
            },
            {
                hid: 'twitter:card',
                property: 'twitter:card',
                content: 'summary_large_image'
            },
            {
                hid: 'twitter:creator',
                property: 'twitter:creator',
                content: 'Timeoff'
            },
            {
                hid: 'twitter:site',
                property: 'twitter:site',
                content: '@TimeoffLab'
            },
            {
                hid: 'twitter:image',
                property: 'twitter:image',
                content: 'https://dokodemo.app/common/sns/ogp-facebook.png'
            }
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/yakuhanjp@3.3.1/dist/css/yakuhanjp-noto.min.css'},
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;484;700&family=Noto+Sans+JP:wght@400;500;700&display=swap'
            },
        ],
        bodyAttrs: {
            class: $.APP_MODE === 'production' ? '' : '-isDev',
        },
//         script: [
//             {src: '//fast.fonts.net/jsapi/7514b05b-a06a-46e2-81a0-e2744ebf8dec.js'},
//         ],
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
        {src: '~plugins/client', ssr: false},
        {src: '~plugins/resize-directive', ssr: false},
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
        ['@nuxtjs/google-analytics', {
            id: $.GA_OFFICIAL,
        }],
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
                compress: {drop_console: prod}
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
    env: {
        APP_TYPE: 'official',
        APP_MODE: $.APP_MODE,
        BASE_URL: $.BASE_URL || 'http://localhost:3000',
        OFFICIAL_URL: $.OFFICIAL_URL || 'http://localhost:3000',
        API_BASE_URL: $.API_BASE_URL || 'http://localhost:3000/api/v1',
        API_POSTCODE_URL: $.API_BASE_URL || '',
        GOOGLE_RECAPTCHA_SITE_KEY: $.GOOGLE_RECAPTCHA_SITE_KEY || '',
        STRIPE_PUB_KEY: $.STRIPE_PUB_KEY || '',
        // - OFFICIAL
        GA_OFFICIAL: $.GA_OFFICIAL || '',
        LANG: lang,
    },
    basic: {
        name: $.AUTH_ID,
        pass: $.AUTH_PW,
        enabled: $.IS_AUTH === 'true' // require boolean value(nullable)
    },
}
