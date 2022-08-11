import type { App } from "vue";
import * as composables from "./functions";

export const VuePlugin = {
	install(vue: App, options: any[]) {
		for (const [key, composable] of Object.entries(composables)) {
			vue.config.globalProperties[key] = composable;
		}
	},
};

export * from "./functions";
