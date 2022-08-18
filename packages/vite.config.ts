import { defineConfig } from "vitest/config";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Unocss from "unocss/vite";
import Inspect from "vite-plugin-inspect";
import VueTypeImports from "@zolyn/vite-plugin-vue-type-imports";
import { generateSitemap as sitemap } from "sitemap-ts";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@agufaui/vue": resolve(__dirname, "vue/index.ts"),
			"@components": resolve(__dirname, "vue/components"),
		},
		dedupe: ["vue"],
	},

	plugins: [
		VueTypeImports(),
		// auto import components
		Components({
			dts: resolve(__dirname, ".vitepress/components.d.ts"),
			include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
			dirs: [
				resolve(__dirname, ".vitepress/theme/components"),
				resolve(__dirname, "vue/components"),
				resolve(__dirname, "core"),
			],
			transformer: "vue3",
		}),
		// auto import composables
		AutoImport({
			dts: true,
			include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
			dirs: [resolve(__dirname, "use/functions")],
			imports: ["vitepress", "vue"],
			vueTemplate: true,
		}),
		Unocss({
			mode: "global",
		}),
		Inspect(),
	],

	test: {
		globals: true,
		environment: "happy-dom",
		reporters: "dot",
	},
});
