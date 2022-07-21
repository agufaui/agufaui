import type { AUseDeepCloneReturn } from "./types";

export function aUseDeepClone(): AUseDeepCloneReturn {
  function deepClone<T>(obj: T): T {
    return Array.isArray(obj)
      ? obj.map((item) => deepClone(item))
      : obj instanceof Date
      ? new Date(obj.getTime())
      : obj instanceof Map
      ? new Map(
          Array.from(obj.entries()).map(([key, value]) => [
            key,
            deepClone(value),
          ])
        )
      : obj && typeof obj === "object"
      ? Object.getOwnPropertyNames(obj).reduce((o, prop) => {
          Object.defineProperty(
            o,
            prop,
            Object.getOwnPropertyDescriptor(obj, prop)!
          );
          o[prop] = deepClone((obj as { [key: string]: any })[prop]);
          return o;
        }, Object.create(Object.getPrototypeOf(obj)))
      : (obj as T);
  }
  return { deepClone };
}
