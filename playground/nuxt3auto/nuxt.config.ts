import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	components: ["~/components", { path: "node_modules/@agufaui/vue/dist/es/vue/components" }],
	css: [
		"@unocss/reset/tailwind.css",
		"@agufaui/vue/agufaui.css",
		"@agufaui/vue/theme.css",
		"uno.css",
	],
	typescript: {
		shim: false,
	},
	modules: ["@unocss/nuxt"],
	plugins: [],
});
