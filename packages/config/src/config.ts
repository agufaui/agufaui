import { IConfig, CConfigReplaceLine, CConfigDeleteLine } from "./config.type";
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
		userConfig.locales?.map((locale) => (this.#locales[locale.locale] = locale));
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
								this.#processUseType(typeObj, useTypeObj);
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
								this.#processUseType(typeObj, useTypeObj);
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

	#processUseType(currentObj: TComponentType, useTypeObj: TComponentType): void {
		for (const [field, value] of Object.entries(useTypeObj)) {
			if (currentObj[field] === undefined) {
				currentObj[field] = value;
			} else if (currentObj[field].startsWith(CConfigReplaceLine)) {
				// replace useType object field with current type object field
				currentObj[field] = currentObj[field].slice(4);
				continue;
			} else if (currentObj[field].startsWith(CConfigDeleteLine)) {
				// delete this field
				delete currentObj[field];
				continue;
			} else if (field.endsWith("c")) {
				const currentElements: string[] = currentObj[field].split(" ").filter(Boolean);
				let useTypeElements: string[] = value.split(" ").filter(Boolean);

				const replaceList: string[] = [];
				const deleteList: string[] = [];

				for (let i = 0; i < currentElements.length; i++) {
					const ele = currentElements[i];

					if (ele.startsWith("r@")) {
						// eg. [r@, text-blue-2]
						currentElements[i] = "";

						i++;

						if (i === currentElements.length) {
							break;
						}

						// eg. text-blue-2 to [text, blue, 2]
						const quasis = currentElements[i].split("-");

						// eg. [text, blue, 2] to text
						const match = quasis[0];

						// eg. [text-lg, text-blue-1, hover:text-blue-2] to [hover:text-blue-2]
						useTypeElements = useTypeElements.filter((e) => !e.startsWith(match));
					}

					if (ele.startsWith("d@")) {
						// eg. d@text-blue-2 to text-blue-2
						const match = currentElements[i].slice(2);

						// eg. [text-lg, text-blue-2, hover:text-blue-2] to [text-lg, hover:text-blue-2]
						useTypeElements = useTypeElements.filter((e) => e !== match);

						currentElements[i] = "";
					}
				}

				const useTypeElementsString = useTypeElements.join(" ");
				const currentElementsString = currentElements.filter(Boolean).join(" ");

				currentObj[field] = useTypeElementsString + " " + currentElementsString;
			}
		}
	}

	setTheme(baseTheme: ITheme | undefined, userTheme: ITheme | undefined): void {
		this.#setBaseTheme(baseTheme);
		this.#setUserTheme(userTheme);
	}

	get theme(): ITheme {
		return this.#userTheme;
	}

	set userTheme(userTheme: ITheme) {
		this.#userTheme = userTheme;
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
