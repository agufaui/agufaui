import { defineConfig } from "vitest/config";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Unocss from "unocss/vite";
import Inspect from "vite-plugin-inspect";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@agufaui/core": resolve(__dirname, "core/index.ts"),
      "@agufaui/docs-utils": resolve(__dirname, ".vitepress/plugins/utils.ts"),
      "@components": resolve(__dirname, "core/components"),
    },
  },

  plugins: [
    Unocss({
      // mode: "global",
    }),
    // auto import components
    Components({
      dts: resolve(__dirname, ".vitepress/components.d.ts"),
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: [
        resolve(__dirname, ".vitepress/theme/components"),
        resolve(__dirname, "core/components"),
      ],
      transformer: "vue3",
    }),
    // auto import composables
    AutoImport({
      dts: true,
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      dirs: [resolve(__dirname, "use")],
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
