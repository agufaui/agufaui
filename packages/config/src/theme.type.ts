/**
 * @example "hello" | true
 */
export type TFieldValue = string | boolean;

/**
 * @example { text: "hello", show: true }
 */
export type TComponentType = Record<string, TFieldValue>;

/**
 * @example { "default": { text: "hello", show: true }, "primary": { text: "world", show: false } }
 */
export type TComponent = Record<string, TComponentType>;

/**
 * @summary The theme object.
 */
export interface ITheme {
  [componentName: string]: Readonly<TComponent>;
}

/**
 * @summary The user configuration object.
 */
export interface IUserConfig {
  /**
   * @description User configured Theme
   */
  theme?: ITheme;
}
