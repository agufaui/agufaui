import { VuePlugin } from "@agufaui/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VuePlugin);
});
