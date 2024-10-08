import { defineNuxtConfig } from 'nuxt/config'
import { extendUnocssOptions } from '@nuxt/devtools-ui-kit/unocss'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    'nuxt-icon',
    'nuxt-og-image',
    '@nuxt/ui',
  ],

  unocss: extendUnocssOptions({}),
  devtools: {
    enabled: true,
  },

  ogImage: {
    // fonts: [
    //   'Inter:400',
    //   'Inter:700',
    //   {
    //     name: 'optieinstein',
    //     weight: 800,
    //     path: '/OPTIEinstein-Black.otf',
    //   }
    // ],
    defaults: {
      // component: 'BannerTemplate',
      appName: 'My App',
    },
    // runtimeCompatibility: {
    //   bindings: {
    //     'chromium': false,
    //     'css-inline': 'node',
    //     'resvg': 'wasm',
    //     'satori': 'node',
    //     'sharp': false,
    //   },
    //   wasmStrategy: 'inline',
    // },
    debug: true,
  },

  // nitro: {
  //   experimental: {
  //     wasm: true,
  //   },
  //   wasm: {
  //     esmImport: true,
  //   },
  //   rollupConfig: {
  //     output: {
  //       inlineDynamicImports: true,
  //     },
  //   },
  // },

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

  compatibilityDate: '2024-09-29',
})
