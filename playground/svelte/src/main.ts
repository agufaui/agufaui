import "@agufaui/svelte/agufaui.css";
import "@agufaui/svelte/theme.css";
import App from "./App.svelte";
import { configStore } from "@agufaui/svelte";
import { Config } from "@agufaui/config";
import { Theme } from "@agufaui/theme";

configStore.set(
	new Config({
		baseTheme: Theme,
	})
);

const app = new App({
	target: document.getElementById("app"),
});

export default app;
