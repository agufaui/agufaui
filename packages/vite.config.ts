import { defineConfig } from "vitest/config";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Unocss from "unocss/vite";
import Inspect from "vite-plugin-inspect";
import { NavbarTitleFix } from "./.vitepress/plugins/navbarTitle";
import VueTypeImports from "@zolyn/vite-plugin-vue-type-imports";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@agufaui/vue": resolve(__dirname, "vue"),
      "@agufaui/docs-utils": resolve(__dirname, ".vitepress/plugins/utils.ts"),
      "@components": resolve(__dirname, "vue/components"),
    },
  },

  plugins: [
    NavbarTitleFix(),
    Unocss({
      // mode: "global",
    }),
    VueTypeImports(),
    // auto import components
    Components({
      dts: resolve(__dirname, ".vitepress/components.d.ts"),
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: [
        resolve(__dirname, ".vitepress/theme/components"),
        resolve(__dirname, "vue/components"),
        resolve(__dirname, "core"),
      ],
      transformer: "vue3",
    }),
    // auto import composables
    AutoImport({
      dts: true,
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      dirs: [resolve(__dirname, "use/functions")],
      imports: ["vitepress", "vue"],
      vueTemplate: true,
    }),
    Inspect(),
  ],
  test: {
    globals: true,
    environment: "happy-dom",
    reporters: "dot",
  },
});
