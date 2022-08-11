import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
// import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		Unocss(),
		vue(),
		// Components({
		//   resolvers: [
		//     (componentName) => {
		//       // where `componentName` is always CapitalCase
		//       if (componentName.startsWith("A"))
		//         return { name: componentName, from: "@agufaui/vue" };
		//     },
		//   ],
		// }),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
