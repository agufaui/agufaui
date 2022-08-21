import { defineConfig } from "vitest/config";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "index.ts"),
			name: "@agufaui/translate",
		},
		rollupOptions: {
			external: ["node-fetch"],
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
					globals: {
						"node-fetch": "fetch",
					},
					dir: "dist/umd",
					format: "umd",
					entryFileNames: "index.js",
					name: "AgufaUITranslate",
					sourcemap: false,
				},
				{
					globals: {
						"node-fetch": "fetch",
					},
					dir: "dist/iife",
					format: "iife",
					entryFileNames: "index.js",
					name: "AgufaUITranslate",
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
