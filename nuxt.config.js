module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '슝 for crew',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: 'hybrid app for Shoong crew' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  // loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  buildDir: 'build',
  build: {
    publicPath: '/nuxtfiles/',
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    ['nuxt-sass-resources-loader'],
  ],
  css: ['~/assets/normalize.css'],
  plugins: [
    { src: '~/plugins/cookies.js', ssr: false },
  ],
  router: {
    mode: 'hash',
  },
};
