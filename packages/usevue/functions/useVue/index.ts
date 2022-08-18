import type { IUseVue } from "./types";
import { ComputedRef, toRef, computed } from "vue";
import type { IConfig } from "@agufaui/config";

export function useVue(): IUseVue {
	function getComputedFromProps<T>(
		props: Readonly<T>,
		component: string,
		config: IConfig | undefined
	): Record<string, ComputedRef> {
		const computedProperties: Record<string, ComputedRef> = {};
		const typeRef = toRef(props, "t" as keyof T);

		for (const propName in props) {
			if (["t", "v", "tabindex", "label"].includes(propName)) continue;

			const prop = toRef(props, propName as keyof T);

			if (typeof prop.value === "boolean") continue;

			const computedName = "c" + propName;

			if (propName.endsWith("c")) {
				computedProperties[computedName as keyof typeof computedProperties] = computed<
					typeof prop.value
				>(() => {
					return (
						((config?.getFieldValue(component, typeRef.value, propName) as typeof prop.value) ??
							"") + (prop.value ? " " + prop.value : "")
					);
				});
			} else {
				computedProperties[computedName as keyof typeof computedProperties] = computed<
					typeof prop.value
				>(() => {
					return (
						prop.value ??
						(config?.getFieldValue(component, typeRef.value, propName) as typeof prop.value)
					);
				});
			}
		}

		return computedProperties;
	}

	return { getComputedFromProps };
}

export * from "./types";
