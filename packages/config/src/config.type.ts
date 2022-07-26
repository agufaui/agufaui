// types of the components configuration map
export type ComponentsMapType = Map<string, TypesMapType>;
export type TypesMapType = Map<string, FieldsMap>;
export type FieldsMap = Map<string, TFieldReturn>;
export type TFieldReturn = string | boolean | undefined;

import type { IUserConfig } from "./theme.type";

/**
 * @summary The configuration object
 */
export interface ConfigConstructor {
  /**
   * @param {IUserConfig} userConfig The user configuration object.
   */
  new (userConfig: IUserConfig): IConfig;
}

/**
 * @summary The configuration object
 */
export interface IConfig {
  /**
   * @description get field configured value
   * @param {string} componentName component name
   * @param {string | undefined} type component type
   * @param {string} fieldName field name
   * @returns {TFieldValue} field value
   */
  getDefault: (componentName: string, type: string | undefined, field: string) => TFieldReturn;
}
