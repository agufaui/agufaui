import type { App } from "vue";
import * as components from "./components";

const VuePlugin = {
  install(vue: App, options: any[]) {
    for (const [key, component] of Object.entries(components)) {
      vue.component(component.name, component);
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

export default VuePlugin;
