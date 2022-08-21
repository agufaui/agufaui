import type { IConfig } from "./config.type";
import type { TLang } from "@agufaui/locale";
import { en } from "@agufaui/locale";
import {
	ITheme,
	IUserConfig,
	CDefaultType,
	CUseType,
	CBase,
	TComponentType,
	TComponent,
} from "./theme.type";
import { expandVariantGroup } from "./variantGroup";

export class Config implements IConfig {
	// #replace: boolean = false;
	#locale: string | object = "en";
	#locales: Record<string, TLang> = { [en.locale]: en };
	#userTheme: ITheme = {};

	constructor(userConfig: IUserConfig = {}) {
		// this.#replace = userConfig.replace ?? this.#replace;
		this.#locale = userConfig.locale ?? this.#locale;
		this.locales = userConfig.locales;
		this.setTheme(userConfig.baseTheme, userConfig.theme);
	}

	#setBaseTheme(theme: ITheme | undefined): void {
		this.#userTheme = theme || {};

		// iterate base theme, for each component
		for (const [_, componentObj] of Object.entries(this.#userTheme)) {
			let again: boolean;
			let loop = 0;
			do {
				again = false;
				loop++;
				// for each type
				for (const [typeName, typeObj] of Object.entries(componentObj)) {
					// expand variant groups
					if (loop === 1) {
						// for each field
						for (const [field, value] of Object.entries(typeObj)) {
							if (field.endsWith("c")) {
								typeObj[field] = expandVariantGroup(value as string);
							}
						}
					}

					// process useType
					if (typeObj[CUseType]) {
						// if useType is same as current type name
						if (typeName === typeObj[CUseType]) {
							delete typeObj[CUseType];
							continue;
						}

						const useTypeObj = componentObj[typeObj[CUseType] as string];
						if (useTypeObj) {
							// if useType object also has a useType, process it first
							if (useTypeObj[CUseType]) {
								if (useTypeObj[CUseType] === typeName) {
									throw new Error("Circular useType");
								}
								again = true;
								continue;
							} else {
								// merge useType object into current type object
								for (const [field, value] of Object.entries(useTypeObj)) {
									if (typeObj[field] === undefined) {
										typeObj[field] = value;
									} else if (field.endsWith("c")) {
										typeObj[field] = value + " " + typeObj[field];
									}
								}
							}
						}

						delete typeObj[CUseType];
					}
				}
			} while (again);
		}
	}

	#setUserTheme(theme: ITheme | undefined): void {
		const userTheme = theme || {};

		// iterate user theme, for each component
		for (const [componentName, componentObj] of Object.entries(userTheme)) {
			let again: boolean;
			let loop = 0;
			const baseComponentCopy: TComponent = Object.assign({}, this.#userTheme[componentName]);

			let isNewComponent = false;

			if (!this.#userTheme[componentName]) {
				this.#userTheme[componentName] = componentObj;
				isNewComponent = true;
			}

			do {
				again = false;
				loop++;

				// for each type
				for (const [typeName, typeObj] of Object.entries(componentObj)) {
					// expand variant groups
					if (loop === 1) {
						for (const [field, value] of Object.entries(typeObj)) {
							if (field.endsWith("c")) {
								typeObj[field] = expandVariantGroup(value as string);
							}
						}
					}

					const useType = typeObj[CUseType] as string;

					// process useType
					if (useType) {
						let useTypeObj: TComponentType;
						// if useType is same as current type name
						if (useType === typeName) {
							useTypeObj = baseComponentCopy?.[useType];
						} else if (useType.startsWith(CBase)) {
							// if useType is base:xxx
							const baseUseType = useType.substring(CBase.length);
							useTypeObj = baseComponentCopy?.[baseUseType];
						} else {
							useTypeObj =
								componentObj[typeObj[CUseType] as string] ??
								baseComponentCopy?.[typeObj[CUseType] as string];
						}

						if (useTypeObj) {
							// if useType object also has a useType, process it first
							if (useTypeObj[CUseType]) {
								if (useTypeObj[CUseType] === typeName) {
									throw new Error("Circular useType");
								}
								again = true;
								continue;
							} else {
								// merge useType object into current type object
								for (const [field, value] of Object.entries(useTypeObj)) {
									if (typeObj[field] === undefined) {
										typeObj[field] = value;
									} else if (field.endsWith("c")) {
										typeObj[field] = value + " " + typeObj[field];
									}
								}
							}
						}

						delete typeObj[CUseType];
					}

					if (!isNewComponent) {
						this.#userTheme[componentName][typeName] = typeObj;
					}
				}
			} while (again);
		}
	}

	setTheme(baseTheme: ITheme | undefined, userTheme: ITheme | undefined): void {
		this.#setBaseTheme(baseTheme);
		this.#setUserTheme(userTheme);
	}

	get theme(): ITheme {
		return this.#userTheme;
	}

	get locale(): string | object {
		return this.#locale;
	}

	set locale(value: string | object) {
		this.#locale = value;
	}

	get locales(): TLang[] {
		return Object.values(this.#locales);
	}

	set locales(langs: TLang[] | undefined) {
		if (langs && langs.length > 0) {
			this.#locales = {};
			for (const lang of langs) {
				this.#locales[lang.locale] = lang;
			}
		}
	}

	getLang(locale: string): TLang {
		return this.#locales[locale];
	}

	getFieldValue(componentName: string, type: string | undefined, field: string): any {
		return this.#userTheme[componentName]?.[type ?? CDefaultType]?.[field];
	}
}
