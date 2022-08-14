import { createApp } from "vue";
import App from "./App.vue";
import { VuePlugin } from "@agufaui/vue";
import { Config } from "@agufaui/vue";
import "@unocss/reset/tailwind.css";
import "@agufaui/vue/agufaui.css";
import "uno.css";

const app = createApp(App);

app.provide<Config>(
	"agufaUIConfig",
	new Config({
		theme: {
			abutton: {
				default: {
					type: "submit",
					size: "text-lg",
					bg: "bg-green",
					aClass: "w-full",
				},
				primary: {
					color: "text-white",
					bg: "bg-sky",
				},
			},
		},
	})
);

app.use(VuePlugin);

app.mount("#app");
