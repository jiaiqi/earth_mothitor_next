import { appDescription } from './app/constants/index'
import { pwa } from './app/config/pwa'

export default defineNuxtConfig({

  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in', // 默认值
    },
    layoutTransition: {
      name: 'slide',
      mode: 'out-in', // 默认值
    },
  },
  runtimeConfig: {
    public: {
      title: 'Nuxt3-Template',
      description: '',
      apiBase: 'http://10.7.203.147',
      basePort: '9527',
      updaPort: '9529',
      cataPort: '9529',
      servPort: '9541',
      cartPort: '9546',
      collePort: '9549',
      regulationPort: '9531',
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    '@element-plus/nuxt',
    '@nuxt/image',
    'dayjs-nuxt',
  ],
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
    // viewTransition: true, // 视图过渡API（实验性）

  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'apple-touch-icon', href: '/pwa-512x512.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
  },

  pwa,

  devtools: {
    enabled: true,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-08-14',
})
