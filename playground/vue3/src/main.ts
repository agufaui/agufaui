import { createApp, ref } from "vue";
import App from "./App.vue";
import { VuePlugin, IConfig, Config, en, zhCn, Theme, CConfigProvideName } from "@agufaui/vue";
import "@unocss/reset/tailwind.css";
import "@agufaui/vue/agufaui.css";
import "@agufaui/vue/theme.css";
import "uno.css";

const app = createApp(App);

app.provide<IConfig>(
	CConfigProvideName,
	new Config({
		locale: ref<string>("en"),
		locales: [en, zhCn],
		baseTheme: Theme,
		theme: {
			abutton: {
				default: {
					type: "submit",
					c: "w-full bg-green text-lg",
				},
				primary: {
					c: "bg-sky text-white",
				},
			},
		},
	})
);

app.use(VuePlugin);

app.mount("#app");
