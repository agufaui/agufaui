import type { IConfig } from "./config.type";
import {
	ITheme,
	IUserConfig,
	TFieldValue,
	CDefaultType,
	CUseType,
	CBase,
	TComponentType,
	TComponent,
} from "./theme.type";
import { expandVariantGroup } from "./variantGroup";

export class Config implements IConfig {
	// #replace: boolean = false;
	#userTheme: ITheme;

	constructor(userConfig: IUserConfig = {}) {
		// this.#replace = userConfig.replace ?? this.#replace;
		this.#userTheme = userConfig.baseTheme || {};
		const userTheme = userConfig.theme || {};

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

	get theme(): ITheme {
		return this.#userTheme;
	}

	getFieldValue(componentName: string, type: string | undefined, field: string): TFieldValue {
		return this.#userTheme[componentName]?.[type ?? CDefaultType]?.[field];
	}
}
