# Get Started

<!-- "@unocss-ignore" -->

AgufaUI is a UI library that uses [Unocss](https://github.com/unocss/unocss) underneath. With CSS classnames controlled configuration, it's highly customizable, and also compatible with any CSS framework, [Unocss](https://github.com/unocss/unocss), [Windicss](https://windicss.org/), [Tailwindcss](https://tailwindcss.com/), and any custom CSS class.

We assume you are already familiar with the basic ideas of Atomic/Utility First CSS before you continue.

- [Value Auto-infer](https://windicss.org/features/value-auto-infer.html)

```html
<!-- sizes and positions -->
<div class="p-5px mt-[0.3px]"></div>

<!-- colors -->
<button class="bg-hex-b2a8bb"></button>
<button class="bg-[#b2a8bb]"></button>
<button class="bg-[hsl(211.7,81.9%,69.6%)]"></button>

<!-- grid template -->
<div class="grid-cols-[auto,1fr,30px]"></div>
```

- [Variant Group](https://windicss.org/features/variant-groups.html)

```html
<div class="hover:(bg-gray-400 font-medium) bg-white font-light" />
```

- [Pure CSS Icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons/)

```html
<!-- A basic anchor icon from Phosphor icons -->
<div class="i-ph-anchor-simple-thin" />
<!-- An orange alarm from Material Design Icons -->
<div class="i-mdi-alarm text-orange-400" />
<!-- A large Vue logo -->
<div class="i-logos-vue text-3xl" />
<!-- Sun in light mode, Moon in dark mode, from Carbon -->
<button class="i-carbon-sun dark:i-carbon-moon" />
<!-- Twemoji of laugh, turns to tear on hovering -->
<div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
```

> **Make sure you read [Configuration](./config) for components customization before you jump ahead**

## Installation

```bash
# npm
npm i @agufaui/vue
# yarn
yarn add @agufaui/vue
# pnpm
pnpm add @agufaui/vue
```

### CDN

::: details Click to see Vue example
```vue
<html lang="en">
  <head>
    <!-- Import style -->
    <link rel="stylesheet" href="//unpkg.com/agufaui/vue/agufaui.css" />
    <!-- Import Vue 3 -->
    <script src="//unpkg.com/vue@next"></script>
    <!-- Import component library -->
    <script src="//unpkg.com/agufaui/vue"></script>
  </head>
  <body>
    <div id="app">
      <a-button>Click me</a-button>
    </div>
    <script>
        const app = Vue.createApp();
        app.provide('agufaUIConfig', new AgufaUI.Config())
        app.use(AgufaUI.VuePlugin);
        app.mount("#app");
    </script>
  </body>
</html>
```
:::

> It will be exposed to global as `window.AgufaUI`

### Tree Shaking

**Auto Import** and **Manual Import** provide [Tree Shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) out of box.

### CSS Layering
AgufaUI CSS needs to have lower priority so it won't override user CSS when there is overlapping.  Just position it before user layer of your css framework.

For example, if you are using Unocss

```ts
import "@agufaui/vue/agufaui.css";
import "uno:icon.css"
import "uno.css"
```

### Vue 3 {#vue3}

In `src/main.{js,ts}` file:

```ts
// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import { Config } from "@agufaui/vue";
// Uncomment following line for Global Registration
// import { VuePlugin } from "@agufaui/vue";
import "@agufaui/vue/agufaui.css";

const app = createApp(App);

// required
app.provide<Config>("agufaUIConfig", new Config());

// Uncomment following line for Global Registration
// app.use(VuePlugin);

app.mount("#app");
```

#### Auto Import

Install [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)

```bash
# npm
npm i -D unplugin-vue-components
# yarn
yarn add -D unplugin-vue-components
# pnpm
pnpm add -D unplugin-vue-components
```

In `vite.config.{js,ts}`:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        (componentName) => {
          /**
           * 1. if you want to add prefix:
           * if (componentName.startsWith("Ai"))
           *  return { name: componentName.splice(2), from: "@agufaui/vue" };
           * 2. in your template .vue file:
           *  <ai-aButton text="hello world" />
           */
          if (componentName.startsWith("A")) return { name: componentName, from: "@agufaui/vue" };
        },
      ],
    }),
  ],
});
```

#### Manual Import {#vue3manual}

Manually import the component you want to use per file:

```vue
// app.vue
<script>
  import { AButton } from "@agufaui/vue";
</script>
```

#### Global Configuration

If you don't mind extra bundle size, uncomment `VuePlugin` lines in `src/main.{js,ts}` file [mentioned above](/guide/#vue3)

#### Usage {#vue3usage}

In your template vue file:

```vue
<template>
  <a-button text="hello world" />
</template>
```

### Nuxt 3 {#nuxt3}

In Nuxt project root, create `plugins` folder, then create `agufaui.{js,ts}` file

```ts
// plugins/agufaui.ts
import { Config } from "@agufaui/vue";
// Uncomment following line for Global Registration
// import { VuePlugin } from "@agufaui/vue";

export default defineNuxtPlugin((nuxtApp) => {
  // required
  nuxtApp.vueApp.provide<Config>("agufaUIConfig", new Config());

  // Uncomment following line for Global Registration
  // nuxtApp.vueApp.use(VuePlugin);
});
```

In `nuxt.config.{js,ts}` file, import style:

```ts
// nuxt.config.ts
import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  css: ["@agufaui/vue/agufaui.css"],
});
```

#### Auto Import

In `nuxt.config.{js,ts}`

```ts
// nuxt.config.ts
import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  components: ["~/components", { path: "node_modules/@agufaui/vue" }],
});
```

#### Manual Import

Same as Vue 3 manual import [mentioned above](/guide/#vue3manual)

#### Global Configuration

If you don't mind extra bundle size, uncomment `VuePlugin` lines in `plugins/agufaui.{js,ts}` file [mentioned above](/guide/#nuxt3)

#### Usage

Same as Vue 3 usage [mentioned above](/guide/#vue3usage)
