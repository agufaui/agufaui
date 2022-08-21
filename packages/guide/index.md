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
<div class="hover:(bg-gray-4 font-medium) bg-white font-light" />
```

::: warning Site Examples
You will not see variant group syntax in this site's examples, even though the actual code is written in variant group syntax, because this site is using Unocss, and Unocss auto splits variant group syntax when scanning whole file. There is no way for Unocss to ignore single lines for now.
:::

- [Pure CSS Icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons/)

```html
<!-- A basic anchor icon from Phosphor icons -->
<div class="i-ph-anchor-simple-thin" />
<!-- An orange alarm from Material Design Icons -->
<div class="i-mdi-alarm text-orange-4" />
<!-- A large Vue logo -->
<div class="i-logos-vue text-3xl" />
<!-- Sun in light mode, Moon in dark mode, from Carbon -->
<button class="i-carbon-sun dark:i-carbon-moon" />
<!-- Twemoji of laugh, turns to tear on hovering -->
<div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
```

#### Tree Shaking

**Auto Import** and **Manual Import** provide [Tree Shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) out of box.

##### CSS Tree Shaking

For any Atomic/Utility CSS framework, just specify AgufaUI files to scan.

For example, for ESM Vue components, in tailwindcss or windicss config file:

```bash
module.exports = {
	content: [
		"node_modules/@agufaui/vue/dist/es/vue/components/button/Abutton.mjs",
		"node_modules/@agufaui/vue/dist/es/vue/components/alert/Aalert.mjs",
		...
	]
}
```

If you are using AugfaUI provided theme, also need to add:

```bash
module.exports = {
	content: [
		"node_modules/@agufaui/vue/dist/es/theme/dist/es/theme/default/AButton.mjs",
		"node_modules/@agufaui/vue/dist/es/theme/dist/es/theme/default/AAlert.mjs",
		...
	]
}
```

#### CSS Layering

AgufaUI CSS needs to have lower priority so it won't override user CSS when there is overlapping. Just position it before user layer of your css framework.

For example, if you are using Unocss

```ts
// Browser Reset CSS
import "@unocss/reset/tailwind.css";
// AgufaUI positional CSS
import "@agufaui/vue/agufaui.css";
// AgufaUI provided theme CSS
import "@agufaui/vue/theme.css";
import "uno.css";
```

> For above reset CSS, run `npm install -D @unocss/reset` to install

#### Customization

**Make sure you read [Configuration](./config) for components customization before you jump to coding.**

#### Site Examples

Site examples are using AgufaUI provided theme, Vue and Unocss.  CSS that are marked as important `!text-white` are mainly used to override vitepress default css.

## Installation

#### Vue/Nuxt

```bash
# npm
npm i @agufaui/vue
# yarn
yarn add @agufaui/vue
# pnpm
pnpm add @agufaui/vue
```

#### Svelte/SvelteKit

```bash
# npm
npm i @agufaui/svelte @agufaui/config @agufaui/theme @agufaui/locale
# yarn
yarn add @agufaui/svelte @agufaui/config @agufaui/theme @agufaui/locale
# pnpm
pnpm add @agufaui/svelte @agufaui/config @agufaui/theme @agufaui/locale
```

#### CDN

::: details Click to see Vue example

```vue
<html lang="en">
	<head>
		<!-- Import style -->
		<link rel="stylesheet" href="//unpkg.com/@unocss/reset/tailwind.css" />
		<link rel="stylesheet" href="//unpkg.com/@agufaui/vue/dist/es/assets/agufaui.css" />
		<link rel="stylesheet" href="//unpkg.com/@agufaui/vue/dist/es/assets/theme.css" />

		<!-- Import Vue 3 -->
		<script src="//unpkg.com/vue@next"></script>

		<!-- Import component library -->
		<script crossorigin="anonymous" type="text/javascript" src="//unpkg.com/@agufaui/vue"></script>
	</head>
	<body>
		<div id="app">
			<abutton
				v="click me"
				c="m-2 text-white bg-blue-6 hover:bg-blue-7 focus:ring-blue-5"
			></abutton>
		</div>

		<script>
			const app = Vue.createApp();
			app.provide(
				"agufaUIConfig",
				new AgufaUI.Config({
					baseTheme: AgufaUI.Theme,
				})
			);
			app.use(AgufaUI.VuePlugin);
			app.mount("#app");
		</script>
	</body>
</html>
```

:::

> It will be exposed to global as `window.AgufaUI`

### Vue 3 {#vue3}

In `src/main.{js,ts}` file:

```ts
// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import type { IConfig } from "@agufaui/vue";
import { Config, CConfigProvideName } from "@agufaui/vue";
// Uncomment following line for Global Registration
// import { VuePlugin } from "@agufaui/vue";

// Replace following line for your css framework Browser Reset CSS
import "@unocss/reset/tailwind.css";

import "@agufaui/vue/agufaui.css";
// Uncomment following lines for AgufaUI provided theme
// import { Theme } from "@agufaui/vue";
// import "@agufaui/vue/theme.css";

const app = createApp(App);

// required
app.provide<IConfig>(
	CConfigProvideName,
	new Config({
		// Uncomment following line for AgufaUI provided theme
		// baseTheme: Theme,
	})
);

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
// *.vue
<script>
import { Abutton } from "@agufaui/vue";
</script>
```

or in `src/main.ts`

```ts
import { createApp } from "vue";
import App from "./App.vue";
import type { IConfig } from "@agufaui/vue";
import { Config, CConfigProvideName, Abutton, Aalert } from "@agufaui/vue";
// Replace following line for your css framework Browser Reset CSS
import "@unocss/reset/tailwind.css";
import "@agufaui/vue/agufaui.css";

const app = createApp(App);

// required
app.provide<IConfig>(CConfigProvideName, new Config());

app.component(Abutton.name, Abutton);
app.component(Aalert.name, Aalert);
...

app.mount("#app");
```

#### Global Configuration

Register all components. If you don't mind extra bundle size, uncomment `VuePlugin` lines in `src/main.{js,ts}` file [mentioned above](/guide/#vue3)

#### Usage {#vue3usage}

In your template vue file:

```vue
<template>
	<abutton text="hello world" />
</template>
```

### Nuxt 3 {#nuxt3}

In Nuxt project root, create `plugins` folder, then create `agufaui.{js,ts}` file

```ts
// plugins/agufaui.ts
import type { IConfig } from "@agufaui/vue";
import { Config, CConfigProvideName } from "@agufaui/vue";
// Uncomment following line for Global Registration
// import { VuePlugin } from "@agufaui/vue";

// Uncomment following line for AgufaUI provided theme
// import { Theme } from "@agufaui/vue";

export default defineNuxtPlugin((nuxtApp) => {
	// required
	nuxtApp.vueApp.provide<IConfig>(
		CConfigProvideName,
		new Config({
			// Uncomment following line for AgufaUI provided theme
			// baseTheme: Theme,
		})
	);

	// Uncomment following line for Global Registration
	// nuxtApp.vueApp.use(VuePlugin);
});
```

In `nuxt.config.{js,ts}` file, import style:

```ts
// nuxt.config.ts
import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
	css: [
		// Replace following line for your css framework Browser Reset CSS
		"@unocss/reset/tailwind.css",
		"@agufaui/vue/agufaui.css",
		// Uncomment following line for AgufaUI provided theme
		// "@agufaui/vue/theme.css",
	],
});
```

<!-- #### Auto Import

In `nuxt.config.{js,ts}`

```ts
// nuxt.config.ts
import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
	components: ["~/components", { path: "node_modules/@agufaui/vue/dist/es/vue/components" }],
});
``` -->

#### Manual Import

Manually import the component you want to use per file:

```vue
// *.vue
<script>
import { Abutton } from "@agufaui/vue";
</script>
```

or in `plugins/agufaui.{js,ts}`

```ts
import type { IConfig } from "@agufaui/vue";
import { Config, CConfigProvideName, Abutton, Aalert } from "@agufaui/vue";

export default defineNuxtPlugin((nuxtApp) => {
	// required
	nuxtApp.vueApp.provide<IConfig>(CConfigProvideName, new Config());

	nuxtApp.vueApp.component(Abutton.name, Abutton);
	nuxtApp.vueApp.component(Aalert.name, Aalert);
	...
});
```

or in `nuxt.config.{js,ts}`

```ts
import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
	components: [
		"~/components",
		{ path: "node_modules/@agufaui/vue/dist/es/vue/components/button" },
		{ path: "node_modules/@agufaui/vue/dist/es/vue/components/alert" },
		...
	],
});
```

#### Global Configuration

Register all components. If you don't mind extra bundle size, uncomment `VuePlugin` lines in `plugins/agufaui.{js,ts}` file [mentioned above](/guide/#nuxt3)

#### Usage

Same as Vue 3 usage [mentioned above](/guide/#vue3usage)

### Svelte/SvelteKit {#svelte3}

In `src/main.{js,ts}` file:

```ts
// Replace following line for your css framework Browser Reset CSS
import "@unocss/reset/tailwind.css";
import "@agufaui/svelte/agufaui.css";
// Uncomment following line for AgufaUI provided theme
// import "@agufaui/svelte/theme.css";
import App from "./App.svelte";
import { configStore } from "@agufaui/svelte";
import { Config } from "@agufaui/config";
// Uncomment following line for AgufaUI provided theme
// import { Theme } from "@agufaui/theme";

configStore.set(
	new Config({
		// Uncomment following line for AgufaUI provided theme
		// baseTheme: Theme,
	})
);

const app = new App({
	target: document.getElementById("app"),
});

export default app;
```

#### Manual Import {#svelte3manual}

Manually import the component you want to use per file:

```html
// *.svelte
<script>
	import { Abutton } from "@agufaui/svelte";
</script>
```

#### Usage {#svelte3usage}

In your template .svelte file:

```html
<Abutton text="hello world" />
```
