import type { IUseLocale } from "./types";
import { isRef, inject } from "vue";
import type { IConfig } from "@agufaui/config";
import { CConfigProvideName } from "@agufaui/config";

export function useLocale(): IUseLocale {
	function tr(componentName: string, key: string): string {
		const config = inject<IConfig>(CConfigProvideName);
		if (!config) {
			throw new Error("No config found");
		}

		const locale = config.locale;

		let currentLocale: string = "en";
		if (typeof locale === "string") {
			currentLocale = locale;
		} else if (isRef<string>(locale)) {
			currentLocale = locale.value;
		}

		const lang = config.getLang(currentLocale);

		const componentLang = lang[componentName] as Record<string, string>;

		return componentLang[key] || key;
	}

	return { tr };
}

export * from "./types";
