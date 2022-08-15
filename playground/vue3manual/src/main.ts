import { createApp } from "vue";
import App from "./App.vue";
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

app.mount("#app");
