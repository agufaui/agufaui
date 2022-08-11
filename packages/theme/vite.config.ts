import { defineConfig } from "vite";
import { resolve } from "path";
import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "index.ts"),
			name: "@agufaui/theme",
		},
		rollupOptions: {
			output: [
				{
					dir: "dist/es",
					format: "es",
					entryFileNames: "[name].mjs",
					assetFileNames: "assets/theme.css",
					preserveModules: true,
					preserveModulesRoot: resolve(__dirname, "../"),
					sourcemap: false,
				},
				{
					dir: "dist/cjs",
					format: "cjs",
					entryFileNames: "[name].cjs",
					assetFileNames: "assets/theme.css",
					preserveModules: true,
					preserveModulesRoot: resolve(__dirname, "../"),
					sourcemap: false,
				},
				{
					dir: "dist/umd",
					format: "umd",
					entryFileNames: "index.js",
					name: "AgufaUITheme",
					sourcemap: false,
				},
				{
					dir: "dist/iife",
					format: "iife",
					entryFileNames: "index.js",
					name: "AgufaUITheme",
					sourcemap: false,
				},
			],
		},
		outDir: resolve(__dirname, "dist"),
		emptyOutDir: true,
		cssCodeSplit: true,
	},
	plugins: [Unocss({ mode: "global", include: [/\.ts$/] })],
});
