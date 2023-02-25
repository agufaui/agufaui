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
		fromPath: string,
		toDirPath: string,
		toFileName: string,
		options: ITransformOptions
	) => Promise<void>;

	vueToQwik: (
		fromPath: string,
		toDirPath: string,
		toFileName: string,
		options: ITransformOptions
	) => Promise<void>;
}

export interface ITransformOptions {
	noComputedProp?: Set<string>;
	noComputedFile?: Set<string>;
	noImport?: Set<string>;
	recursiveComponentsInfo?: TRecursiveComponentInfo[];
	fromFileName?: string;
}

export type TRecursiveComponentInfo = {
	fileName: string;
	matchName: string;
};

export type TVueComponentFile = {
	dir: string;
	file: string;
};
