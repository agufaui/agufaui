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
		},
		rollupOptions: {
			external: ["vue"],
			output: [
				{
					dir: "dist/es",
					format: "es",
					entryFileNames: "[name].mjs",
					assetFileNames: "assets/agufaui.css",
					preserveModules: true,
					preserveModulesRoot: resolve(__dirname, "../"),
					sourcemap: false,
				},
				{
					dir: "dist/cjs",
					format: "cjs",
					entryFileNames: "[name].cjs",
					assetFileNames: "assets/agufaui.css",
					preserveModules: true,
					preserveModulesRoot: resolve(__dirname, "../"),
					sourcemap: false,
				},
				{
					globals: {
						vue: "Vue",
					},
					dir: "dist/umd",
					format: "umd",
					entryFileNames: "index.js",
					name: "AgufaUI",
					sourcemap: false,
				},
				{
					globals: {
						vue: "Vue",
					},
					dir: "dist/iife",
					format: "iife",
					entryFileNames: "index.js",
					name: "AgufaUI",
					sourcemap: false,
				},
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
