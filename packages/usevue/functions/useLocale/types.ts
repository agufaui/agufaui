/**
 * @summary Use Locale
 */
export interface IUseLocale {
	/**
	 * Translate a string based on the current locale
	 * @returns translated string
	 */
	tr: (componentName: string, key: string) => string;
}
