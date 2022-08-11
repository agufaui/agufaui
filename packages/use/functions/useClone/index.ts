import type { IUseClone } from "./types";

export function useClone(): IUseClone {
	function deepClone<T>(obj: T): T {
		return Array.isArray(obj)
			? obj.map((item) => deepClone(item))
			: obj instanceof Date
			? new Date(obj.getTime())
			: obj instanceof Map
			? new Map(Array.from(obj.entries()).map(([key, value]) => [key, deepClone(value)]))
			: obj && typeof obj === "object"
			? Object.getOwnPropertyNames(obj).reduce((o, prop) => {
					Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(obj, prop)!);
					o[prop] = deepClone((obj as { [key: string]: any })[prop]);
					return o;
			  }, Object.create(Object.getPrototypeOf(obj)))
			: (obj as T);
	}

	function jsonClone<T>(obj: T): T {
		return JSON.parse(JSON.stringify(obj));
	}

	function shallowClone<T>(obj: T): T {
		return Object.assign({}, obj);
	}

	return { deepClone, jsonClone, shallowClone };
}

export * from "./types";
