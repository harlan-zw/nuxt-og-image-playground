import { defineNuxtConfig } from 'nuxt/config'
import { extendUnocssOptions } from '@nuxt/devtools-ui-kit/unocss'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    'nuxt-icon',
    'nuxt-og-image',
  ],
  unocss: extendUnocssOptions({}),

  devtools: true,

  nitro: {
    preset: process.env.NITRO_PRESET,
  },

  ogImage: {
    // @todo this is broken in vercel
    // fonts: [
    //   'Inter:400',
    //   'Inter:700',
    //   {
    //     name: 'optieinstein',
    //     weight: 800,
    //     path: '/OPTIEinstein-Black.otf',
    //   }
    // ],
    playground: true,
    runtimeBrowser: true,
    runtimeCacheStorage: false,
    defaults: {
      // component: 'BannerTemplate',
      appName: 'My App',
    },
    debug: true,
  },

  app: {
    head: {
      style: [
        {
          innerHTML: 'body { font-family: \'Inter\', sans-serif; }',
        },
      ],
      link: [
        {
          // reset css to match svg output
          href: 'https://cdn.jsdelivr.net/npm/gardevoir',
          rel: 'stylesheet',
        },
        {
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
          rel: 'stylesheet',
        },
      ],
    }
  },
})
