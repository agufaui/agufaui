/// <reference types="vite/client" />

// these code blocks need to be in their own file, can't be merged with other shims.d.ts files

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
