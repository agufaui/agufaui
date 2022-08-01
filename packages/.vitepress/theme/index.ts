import DefaultTheme from "vitepress/theme";
import type { Theme, EnhanceAppContext } from "vitepress/types";
import { Config, IConfig, CConfigProvideName } from "@agufaui/config";
import { Theme as ATheme } from "@agufaui/theme";

import "../../vue/dist/es/assets/agufaui.css";
import "../../theme/dist/es/assets/theme.css";
import "uno:icons.css";
import "uno.css";
import "./styles/home.css";
import "./styles/doc.css";
import { appendFile } from "fs";
import { isNumberObject } from "util/types";

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    ctx.app.provide<IConfig>(CConfigProvideName, new Config({
      baseTheme: ATheme,
    }));
  },
};

export default theme;
