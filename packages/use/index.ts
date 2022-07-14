import type { App } from "vue";
import * as composables from "./shared";

const VuePlugin = {
  install(vue: App, options: any[]) {
    for (const [key, composable] of Object.entries(composables)) {
      vue.config.globalProperties[key] = composable;
    }
  },
};

declare global {
  interface Window {
    Vue: App;
  }
}

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(VuePlugin);
}

export * from "./shared";

export default VuePlugin;
