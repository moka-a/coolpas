/* eslint-disable nuxt/no-cjs-in-config */
const pkg = require('./package.json')

module.exports = {
  env: {
    APP_VERSION: pkg.version,
  },
  head: {
    title: 'Coolpas',
    htmlAttrs: {
      lang: 'kr',
    },
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: '쿨파스',
      },
      { charset: 'utf-8' },
      { name: 'theme-color', content: '#fdfbef' },
      {
        name: 'keyword',
        content:
          '쿨파스, 이너파스',
      },
      {
        name: 'viewport',
        content:
          'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover',
      },
      { property: 'og:site_name', content: '쿨파스' },
      { property: 'og:url', content: 'https://coolpas.social433.com' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: '쿨파스',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: '쿨파스',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css',
      },
    ],
  },

  css: ['~/assets/css/home.css'],

  plugins: [
    '~/plugins/nl2br',
    '~/plugins/dialog',
    '~/plugins/share',
    '~/plugins/v-outfocus',
  ],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],

  modules: ['@nuxtjs/axios'],

  build: {
    publicPath: process.env.SERVERLESS_NUXT_PUBLIC_PATH,

    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
        'postcss-import': {},
        'postcss-nested': {},
      },
    },
  },

  compilerOptions: {
    types: ['@nuxt/types', '@nuxtjs/axios'],
  },
}
