import DefaultTheme from "vitepress/theme";
import type { Theme, EnhanceAppContext } from "vitepress/types";
import { Config, IConfig, CConfigProvideName } from "@agufaui/config";
import { Theme as ATheme } from "../../theme/default.theme";

import "uno.css";
import "./styles/home.css";
import "./styles/doc.css";

const theme: Theme = {
	...DefaultTheme,
	enhanceApp(ctx: EnhanceAppContext) {
		ctx.app.provide<IConfig>(
			CConfigProvideName,
			new Config({
				baseTheme: ATheme,
			})
		);
	},
};

export default theme;
