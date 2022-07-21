import { createApp } from "vue";
import App from "./App.vue";
import { VuePlugin, Config } from "@agufaui/vue";
import "@unocss/reset/tailwind.css";
import "uno:icons.css";
import "@agufaui/vue/style.css";
import "uno.css";

const app = createApp(App);

app.provide<Config>(
  "agufaUIConfig",
  new Config({
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
  })
);

app.use(VuePlugin).mount("#app");
