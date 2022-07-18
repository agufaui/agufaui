# Agufa UI

## Installation:

```bash
npm install @agufaui/core
```
```bash
yarn add @agufaui/core
```
```bash
pnpm add @agufaui/core
```

### Vue 3

-   in src/main.js or src/main.ts:

```
import { createApp } from "vue";
import App from "./App.vue";
import VuePlugin from "@agufaui/core";
import "@agufaui/core/dist/style.css";

createApp(App).use(VuePlugin).mount("#app");
```

### Nuxt 3

-   create plugins folder, create a .js or .ts file, it will be automatically read and loaded by Nuxt:

```
import VuePlugin from '@agufaui/core'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VuePlugin)
})
```
