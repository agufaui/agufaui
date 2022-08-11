import { VuePlugin, Config } from "@agufaui/vue";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.provide<Config>(
		"agufaUIConfig",
		new Config({
			theme: {
				abutton: {
					default: {
						color: "text-green",
						size: "text-lg",
					},
					primary: {
						color: "text-white",
						bg: "bg-sky",
					},
				},
			},
		})
	);
	nuxtApp.vueApp.use(VuePlugin);
});
