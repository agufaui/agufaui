import DefaultTheme from "vitepress/theme";
import type { Theme, EnhanceAppContext } from "vitepress/types";
import { Config, IConfig } from "@agufaui/config";

import "../../vue/dist/es/assets/agufaui.css";
import "uno:icons.css";
import "uno.css";
import "./styles/home.css";
import "./styles/doc.css";

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    ctx.app.provide<IConfig>("agufaUIConfig", new Config());
  },
};

export default theme;
