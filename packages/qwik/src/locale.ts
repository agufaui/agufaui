import type { TConfig, IConfig } from "@agufaui/config";
import { CConfigProvideName, Config } from "@agufaui/config";
import { createContextId, useContext } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

const CTX = createContextId<TConfig>(CConfigProvideName);

export function tr(componentName: string, key: string): string {
	const tconfig = useContext(CTX);
	const iconfig: IConfig = new Config();
	iconfig.locale = tconfig.locale;
	iconfig.locales = tconfig.locales;
	iconfig.userTheme = tconfig.userTheme;

	if (!iconfig) {
		throw new Error("No config found");
	}

	const locale = iconfig.locale;

	let currentLocale: string = "en";
	if (typeof locale === "string") {
		currentLocale = locale;
	} else if ((locale as Signal<string>).value) {
		currentLocale = (locale as Signal<string>).value;
	}

	const lang = iconfig.getLang(currentLocale);

	const componentLang = lang[componentName] as Record<string, string>;

	return componentLang[key] || key;
}
