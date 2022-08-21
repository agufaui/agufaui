import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "index.ts"),
			name: "@agufaui/locale",
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
					entryFileNames: "index.js",
					name: "AgufaUILocale",
					sourcemap: false,
				},
				{
					dir: "dist/iife",
					format: "iife",
					entryFileNames: "index.js",
					name: "AgufaUILocale",
					sourcemap: false,
				},
			],
		},
		outDir: resolve(__dirname, "dist"),
		emptyOutDir: true,
	},
});
