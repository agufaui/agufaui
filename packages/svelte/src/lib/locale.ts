import { configStore } from "./config";
import type { Writable } from "svelte/store";
import { get, derived } from "svelte/store";
import type { TLang } from "@agufaui/locale";

export const tr = derived(configStore, ($configStore) => (componentName: string, key: string) => {
	const locale = $configStore?.locale;
	let lang: TLang;

	if (typeof locale === "string") {
		lang = $configStore?.getLang(locale);
	} else {
		const localeStore = locale as Writable<string>;
		lang = $configStore?.getLang(get(localeStore));
	}

	const componentLang = lang?.[componentName] as Record<string, string>;

	return componentLang?.[key] || key;
});
