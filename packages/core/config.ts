import type { Theme } from "./types";
import { defaultType } from "./types";
import {
  defaultThemeMap,
  MapComponentType,
  MapComponentTypeType,
  MapFieldType,
} from "./themeMap";
import { aUseDeepClone } from "../use";

export default class Config {
  #mergedTheme: Map<string, MapComponentType> = new Map();

  constructor(userTheme: Theme = {}) {
    this.#mergedTheme = defaultThemeMap;

    if (Object.keys(userTheme).length > 0) {
      /**
       * {
       *  abutton: {
       *    ...
       *  }
       *  ...
       * }
       */
      for (const componentName of Object.keys(userTheme)) {
        const componentTheme = userTheme[componentName as keyof Theme];
        let mergedComponentMap = this.#mergedTheme.get(componentName);

        if (!mergedComponentMap) {
          mergedComponentMap = new Map<string, MapComponentTypeType>();
          this.#mergedTheme.set(componentName, mergedComponentMap);
        }

        /**
         * {
         *  abutton: {
         *    default: {
         *      ...
         *    }
         *    ...
         *  }
         *  ...
         * }
         */
        for (const type in componentTheme) {
          const propsValue = componentTheme[type];
          let propsMap: MapComponentTypeType | undefined =
            mergedComponentMap.get(type);

          if (!propsMap) {
            const defaultPropsMap = mergedComponentMap.get(defaultType);
            if (defaultPropsMap) {
              const { deepClone } = aUseDeepClone();
              propsMap = deepClone(mergedComponentMap.get(defaultType));
              if (!propsMap) {
                propsMap = new Map<string, MapFieldType>();
              }
            } else {
              propsMap = new Map<string, MapFieldType>();
            }
            mergedComponentMap.set(type, propsMap);
          }

          /**
           * {
           *  abutton: {
           *    default: {
           *      color: "text-green",
           *      size: "text-lg",
           *      ...
           *    }
           *    ...
           *  }
           *  ...
           * }
           */
          for (const prop of Object.keys(propsValue)) {
            const value = propsValue[prop as keyof typeof propsValue];
            propsMap.set(prop, value);
          }
        }
      }
    }
  }

  getDefault(
    componentName: string,
    type: string | undefined,
    field: string
  ): MapFieldType {
    let cType = type;
    if (!cType) {
      cType = defaultType;
    }

    return this.#mergedTheme.get(componentName)?.get(cType)?.get(field);
  }
}
