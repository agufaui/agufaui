import { defineConfig } from "vitest/config";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "metadata",
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
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: "happy-dom",
    reporters: "dot",
  },
});
