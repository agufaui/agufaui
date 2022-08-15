import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	css: ["@unocss/reset/tailwind.css", "@agufaui/vue/agufaui.css", "uno.css"],
	typescript: {
		shim: false,
	},
	modules: ["@unocss/nuxt"],
	plugins: [],
});
