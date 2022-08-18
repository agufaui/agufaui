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
