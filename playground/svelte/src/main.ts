import "@unocss/reset/tailwind.css";
import "@agufaui/svelte/agufaui.css";
import "@agufaui/svelte/theme.css";
import "uno.css";
import App from "./App.svelte";
import { configStore } from "@agufaui/svelte";
import { Config } from "@agufaui/config";
import { Theme } from "@agufaui/theme";
import { en, zhCn } from "@agufaui/locale";
import { writable } from "svelte/store";

configStore.set(
	new Config({
		locale: writable<string>("en"),
		locales: [en, zhCn],
		baseTheme: Theme,
	})
);

const app = new App({
	target: document.getElementById("app"),
});

export default app;
