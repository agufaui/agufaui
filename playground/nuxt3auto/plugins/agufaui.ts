import { Theme, Config } from "@agufaui/vue";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.provide<Config>(
		"agufaUIConfig",
		new Config({
			baseTheme: Theme,
			theme: {
				abutton: {
					primary: {
						color: "text-white",
						aclass: "bg-sky",
					},
				},
			},
		})
	);
});
