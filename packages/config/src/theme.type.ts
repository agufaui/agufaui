import type { TLang } from "@agufaui/locale";

export const CDefaultType = "default";
export const CUseType = "useType";
export const CBase = "base:";

/**
 * @example "hello" | true | undefined
 */
export type TFieldValue = string | boolean | undefined;

/**
 * @example { text: "hello", show: true }
 */
export type TComponentType = Record<string, any>;

/**
 * @example { "default": { text: "hello", show: true }, "primary": { text: "world", show: false } }
 */
export type TComponent = Record<string, TComponentType>;

/**
 * @summary The theme object.
 */
export interface ITheme {
	[componentName: string]: TComponent;
}

/**
 * @summary The user configuration object.
 */
export interface IUserConfig {
	/**
	 * ISO 639-1 code
	 * @type {string|object} string or Ref<string> for vue or Writable<string> for svelte
	 * @default "en"
	 */
	locale?: string | object;

	/**
	 * Language objects
	 * @type {TLang[]} Locale objects imported from language files
	 * @default [en] import { en } from "@agufaui/locale";
	 */
	locales?: TLang[];

	/**
	 * Base theme
	 * @default undefined
	 */
	baseTheme?: ITheme;

	/**
	 * User configured Theme.  If base theme is provided, will be merged.
	 * @default undefined
	 */
	theme?: ITheme;
}
