import colors from 'vuetify/es5/util/colors';

export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Work+Sans:300,400,500&display=swap"},
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [
        'plyr/dist/plyr.css'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        "~/plugins/global.js",
        "~/plugins/vue-plyr.js"
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
    '@nuxtjs/vuetify',
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/markdownit'
    ],
    markdownit: {
        injected: true,
    },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                primary: colors.blue.darken2,
                accent: colors.grey.darken3,
                secondary: colors.amber.darken3,
                info: colors.teal.lighten1,
                warning: colors.amber.base,
                error: colors.deepOrange.accent4,
                success: colors.green.accent3
                }
            }
        }
  },
  /*
  ** Build configuration
  */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend (config, ctx) {
        }
    }
}
