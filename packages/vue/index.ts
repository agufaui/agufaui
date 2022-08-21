import "uno.css";
import type { App } from "vue";
import * as components from "./components";

export const VuePlugin = {
	install(vue: App, options: any[]) {
		for (const [key, component] of Object.entries(components)) {
			vue.component(component.name, component);
		}
	},
};

export * from "./components";
export * from "@agufaui/config";
export * from "@agufaui/theme";
export * from "@agufaui/use";
export * from "@agufaui/locale";
