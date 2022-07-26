import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "@agufaui/config",
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
      output: [
        {
          dir: "dist/es",
          format: "es",
          entryFileNames: "[name].mjs",
          preserveModules: true,
          preserveModulesRoot: __dirname,
          sourcemap: false,
        },
        {
          dir: "dist/cjs",
          format: "cjs",
          entryFileNames: "[name].cjs",
          preserveModules: true,
          preserveModulesRoot: __dirname,
          sourcemap: false,
        },
        {
          dir: "dist/umd",
          format: "umd",
          sourcemap: false,
        },
      ],
    },
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});
