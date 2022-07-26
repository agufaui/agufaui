import { defineConfig } from "vitest/config";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import VueTypeImports from "@zolyn/vite-plugin-vue-type-imports";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "agufaui",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => {
        if (format === "es") {
          return "index.mjs";
        }

        if (format === "cjs") {
          return "index.cjs";
        }

        return `index.js`;
      },
    },
    rollupOptions: {
      external: ["vue"],
      output: [
        {
          dir: "dist/es",
          format: "es",
          entryFileNames: "[name].mjs",
          preserveModules: true,
          preserveModulesRoot: resolve(__dirname, "../"),
          sourcemap: false,
        },
        {
          dir: "dist/cjs",
          format: "cjs",
          entryFileNames: "[name].cjs",
          preserveModules: true,
          preserveModulesRoot: resolve(__dirname, "../"),
          sourcemap: false,
        },
        // {
        //   globals: {
        //     vue: "Vue",
        //   },
        //   dir: "dist/umd",
        //   format: "umd",
        //   exports: "named",
        //   sourcemap: false,
        // },
      ],
    },
    outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: true,
  },
  plugins: [
    Unocss({
      mode: "global",
      // mode: "per-module",
    }),
    VueTypeImports(),
    vue({
      reactivityTransform: true,
    }),
  ],
  test: {
    globals: true,
    environment: "happy-dom",
    reporters: "dot",
  },
});
