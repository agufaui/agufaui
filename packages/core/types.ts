import type { AButtonProps } from "./button/types";
import type { AAlertProps } from "./alert/types";
import type { AAlertErrorProps } from "./alertError/types";

// default type of the component
export const defaultType = "default";

// types of the components configuration map
export type MapComponentType = Map<string, MapComponentTypeType>;
export type MapComponentTypeType = Map<string, MapFieldType>;
export type MapFieldType = string | boolean | undefined;

/**
 * @summary The configuration object
 */
export interface ConfigConstructor {
  /**
   * @param {UserConfig} userConfig The user configuration object.
   */
  new (userConfig: UserConfig): ConfigInterface;
}

/**
 * @summary The configuration object
 */
export interface ConfigInterface {
  /**
   * @description get field configured value
   * @param {string} componentName component name
   * @param {string | undefined} type component type
   * @param {string} fieldName field name
   * @returns {MapFieldType} field value
   */
  getDefault: (
    componentName: string,
    type: string | undefined,
    field: string
  ) => MapFieldType;
}

/**
 * @summary The user configuration object.
 */
export interface UserConfig {
  /**
   * @description User configured Theme
   */
  theme?: Theme;
}

/**
 * @summary The theme object.
 */
export interface Theme {
  abutton?: Readonly<Record<string, AButtonProps>>;
  aalert?: Readonly<Record<string, AAlertProps>>;
  aalertError?: Readonly<Record<string, AAlertErrorProps>>;
}
