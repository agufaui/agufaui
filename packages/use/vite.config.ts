import { defineConfig } from "vitest/config";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "@agufaui/use",
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
          exports: "named",
          preserveModules: true,
          preserveModulesRoot: __dirname,
          sourcemap: false,
        },
        {
          dir: "dist/cjs",
          format: "cjs",
          exports: "named",
          preserveModules: true,
          preserveModulesRoot: __dirname,
          sourcemap: false,
        },
        {
          globals: {
            vue: "Vue",
          },
          dir: "dist/umd",
          format: "umd",
          exports: "named",
          sourcemap: false,
        },
      ],
    },
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    // auto import composables
    AutoImport({
      dts: resolve(__dirname, "types/auto-imports.d.ts"),
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      dirs: [resolve(__dirname, "./functions")],
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
