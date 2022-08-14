/**
 * @summary Transform code between frameworks
 */
export interface ITransform {
	/**
	 * Transform vue code to svelte
	 * @example vueToSvelte("packages/vue/components/button/AButton.vue", "packages/svelte/lib/button/AButton.svelte")
	 * @param from Vue file to transform from
	 * @param to Svelte file to transform to
	 */
	vueToSvelte: (
		from: string,
		toDir: string,
		toFile: string,
		options: ITransformOptions
	) => Promise<void>;
}

export interface ITransformOptions {
	noComputed?: Set<string>;
	noImport?: Set<string>;
}
