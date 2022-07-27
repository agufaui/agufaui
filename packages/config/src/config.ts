import type { TFieldReturn, IConfig } from "./config.type";
import { ITheme, IUserConfig } from "./theme.type";

export const DefaultType = "default";

export class Config implements IConfig {
  #userTheme: ITheme;

  constructor(userConfig: IUserConfig = {}) {
    this.#userTheme = userConfig.theme || {};
  }

  getDefault(componentName: string, type: string | undefined, field: string): TFieldReturn {
    return this.#userTheme[componentName]?.[type ?? DefaultType]?.[field];
  }
}
