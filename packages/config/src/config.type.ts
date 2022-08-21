import type { IUserConfig, ITheme } from "./theme.type";
import type { TLang } from "@agufaui/locale";

export type TMatchedRules = {
	raw: string;
	variant: string;
	rules: string[];
	util: string;
	isIcon: boolean;
};

export const CConfigProvideName = "agufaUIConfig";

/**
 * @summary The configuration object
 */
export interface ConfigConstructor {
	/**
	 * @param {IUserConfig} userConfig The user configuration object.
	 */
	new (userConfig: IUserConfig): IConfig;
}

/**
 * @summary The configuration object
 */
export interface IConfig {
	setTheme(baseTheme: ITheme | undefined, userTheme: ITheme | undefined): void;
	/**
	 * Get field configured value
	 * @param {string} componentName component name
	 * @param {string | undefined} type component type
	 * @param {string} fieldName field name
	 * @returns {any} field value
	 */
	getFieldValue: (componentName: string, type: string | undefined, field: string) => any;
	get locale(): string | object;
	set locale(value: string | object);
	get locales(): TLang[];
	set locales(langs: TLang[]);
	getLang(locale: string): TLang;
}
