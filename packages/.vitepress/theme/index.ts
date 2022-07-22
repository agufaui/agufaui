import { handleRedirects } from "./redirects";
import DefaultTheme from "vitepress/theme";
import type { Theme, EnhanceAppContext } from "vitepress/types";
import Config from "../../core/config";
import type { ConfigInterface } from "../../core/types";

import "./styles/code.css";
import "./styles/demo.css";
import "./styles/utils.css";
import "uno:icons.css";
import "uno.css";
import "./styles/overrides.css";

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    ctx.app.provide<ConfigInterface>("agufaUIConfig", new Config());
    // if (typeof window !== "undefined") handleRedirects(ctx.router);
  },
};

export default theme;
