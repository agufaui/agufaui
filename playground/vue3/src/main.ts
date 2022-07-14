import { createApp } from "vue";
import App from "./App.vue";
import VuePlugin from "@agufaui/core";
import "@unocss/reset/tailwind.css";
import "uno:icons.css";
import "@agufaui/core/style.css";
import "uno.css";

createApp(App).use(VuePlugin).mount("#app");
