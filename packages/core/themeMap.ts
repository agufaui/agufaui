// import type {
//   Theme,
//   MapComponentType,
//   MapComponentTypeType,
//   MapFieldType,
// } from "./types";
// import { defaultTheme } from "../theme/default.shared";

// const defaultThemeMap = new Map<string, MapComponentType>();

// for (const componentName of Object.keys(defaultTheme)) {
//   const componentTheme = defaultTheme[componentName as keyof Theme];
//   const typesMap = new Map<string, MapComponentTypeType>();

//   for (const type in componentTheme) {
//     const propsValue = componentTheme[type];
//     const propsMap = new Map<string, MapFieldType>();

//     for (const prop of Object.keys(propsValue)) {
//       const value = propsValue[prop as keyof typeof propsValue];
//       propsMap.set(prop, value);
//     }
//     typesMap.set(type, propsMap);
//   }

//   defaultThemeMap.set(componentName, typesMap);
// }

// export { defaultThemeMap };

export default 1;
