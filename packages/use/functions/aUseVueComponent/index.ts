import type { AUseVueComponentReturn } from "./types";
import { ComputedRef, toRef, computed } from "vue";
import type { IConfig } from "@agufaui/config";

export function aUseVueComponent(): AUseVueComponentReturn {
  function getComputedPropertiesFromProps<T>(
    props: Readonly<T>,
    component: string,
    config: IConfig | undefined
  ): Record<string, ComputedRef> {
    const computedProperties: Record<string, ComputedRef> = {};
    const aTypeRef = toRef(props, "atype" as keyof T);

    for (const propName in props) {
      if (["atype", "text", "msg"].includes(propName)) continue;

      const prop = toRef(props, propName as keyof T);
      const computedName = "c" + propName;

      computedProperties[computedName as keyof typeof computedProperties] = computed(
        (): typeof prop.value => {
          return propName.endsWith("class")
            ? ((config?.getFieldValue(component, aTypeRef.value, propName) as typeof prop.value) ??
                "") + (prop.value ? " " + prop.value : "")
            : typeof prop.value === "boolean"
            ? prop.value ||
              (config?.getFieldValue(component, aTypeRef.value, propName) as typeof prop.value)
            : prop.value ??
              (config?.getFieldValue(component, aTypeRef.value, propName) as typeof prop.value);
        }
      );
    }

    return computedProperties;
  }

  return { getComputedPropertiesFromProps };
}

export * from "./types";
