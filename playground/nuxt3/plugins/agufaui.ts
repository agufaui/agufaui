import { VuePlugin } from "@agufaui/core";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VuePlugin);
});
