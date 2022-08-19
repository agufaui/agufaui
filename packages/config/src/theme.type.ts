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
	 * Base theme
	 */
	baseTheme?: ITheme;

	/**
	 * User configured Theme.  If base theme is provided, will be merged.
	 */
	theme?: ITheme;
}
