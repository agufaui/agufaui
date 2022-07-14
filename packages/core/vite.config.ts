import { defineConfig } from "vitest/config";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "agufaui",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => {
        if (format === "es") {
          return "index.mjs";
        }

        if (format === "cjs") {
          return "index.cjs";
        }

        return `index.${format}.js`;
      },
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: "Vue",
        },
      },
    },
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  plugins: [
    Unocss({
      // mode: "global",
    }),
    vue({
      reactivityTransform: true,
    }),
    Components({
      dts: resolve(__dirname, "types/components.d.ts"),
      globs: [resolve(__dirname, "components") + "/**/Ai*.vue"],
      directoryAsNamespace: true,
      transformer: "vue3",
    }),
    // auto import composables
    AutoImport({
      dts: resolve(__dirname, "types/auto-imports.d.ts"),
      imports: ["vitepress", "vue"],
      vueTemplate: true,
    }),
  ],
  test: {
    globals: true,
    environment: "happy-dom",
    reporters: "dot",
  },
});
