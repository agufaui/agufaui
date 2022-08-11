import { defineConfig } from "vitest/config";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "index.ts"),
			name: "@agufaui/transform",
		},
		rollupOptions: {
			external: ["path", "module", "url", "fs"],
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
			],
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
