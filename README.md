## Features

- 💚 [Nuxt 3](https://nuxt.com/) - SSR, ESR, File-based routing, components auto importing, modules, etc.
- ⚡️ Vite - Instant HMR.
- 🎨 [UnoCSS](https://github.com/unocss/unocss) - The instant on-demand atomic CSS engine.
- 😃 Use icons from any icon sets in Pure CSS, powered by [UnoCSS](https://github.com/unocss/unocss).
- 🔥 The `<script setup>` syntax.
- 🍍 [State Management via Pinia](https://github.com/vuejs/pinia), see [./app/composables/user.ts](./app/composables/user.ts).
- 📑 [Layout system](./app/layouts).
- 📥 APIs auto importing - for Composition API, VueUse and custom composables.
- 🏎 Zero-config cloud functions and deploy.
- 🦾 TypeScript, of course.
- 📲 [PWA](https://github.com/vite-pwa/nuxt) with offline support and auto-update behavior.

## Plugins

### Nuxt Modules

- [VueUse](https://github.com/vueuse/vueuse) - collection of useful composition APIs.
- [ColorMode](https://github.com/nuxt-modules/color-mode) - dark and Light mode with auto detection made easy with Nuxt.
- [UnoCSS](https://github.com/unocss/unocss) - the instant on-demand atomic CSS engine.
- [Pinia](https://github.com/vuejs/pinia) - intuitive, type safe, light and flexible Store for Vue.
- [VitePWA](https://github.com/vite-pwa/nuxt) - zero-config PWA Plugin for Nuxt 3.
- [DevTools](https://github.com/nuxt/devtools) - unleash Nuxt Developer Experience.

## IDE

We recommend using [VS Code](https://code.visualstudio.com/) with [Volar](https://github.com/johnsoncodehk/volar) to get the best experience (You might want to disable [Vetur](https://vuejs.github.io/vetur/) if you have it).

## UI-墨刀地址

[https://ai100x.modao.cc/proto/JxwiHOlsilll9Dt4kQC3F/sharing?view_mode=read_only](https://ai100x.modao.cc/proto/JxwiHOlsilll9Dt4kQC3F/sharing?view_mode=read_only) #百想内地震界面项目-分享

## Try it now!

```bash
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
pnpm dev
```

## Build

```bash
pnpm build
pm2 start ecosystem.config.cjs
```
