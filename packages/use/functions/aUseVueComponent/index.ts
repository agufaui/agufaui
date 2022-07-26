import type { AUseVueComponentReturn } from "./types";
import { ComputedRef, toRef, computed } from "vue";
import type { IConfig } from "@agufaui/config";
import { DefaultType } from "@agufaui/config";
import { aUseStringUtils } from "../aUseStringUtils";

export function aUseVueComponent(): AUseVueComponentReturn {
  function getComputedPropertiesFromProps<T>(
    props: Readonly<T>,
    component: string,
    config: IConfig | undefined,
    defaultPropValues: Readonly<Record<string, T>>
  ): Record<string, ComputedRef> {
    const computedProperties: Record<string, ComputedRef> = {};
    const aTypeRef = toRef(props, "aType" as keyof T);
    const { firstLetterToUpper } = aUseStringUtils();

    for (const propName in props) {
      if (["aType", "text", "msg"].includes(propName)) continue;

      const prop = toRef(props, propName as keyof T);
      const computedName = "c" + firstLetterToUpper(propName);

      computedProperties[computedName as keyof typeof computedProperties] = computed(
        (): typeof prop.value => {
          return (
            prop.value ??
            (config?.getDefault(component, aTypeRef.value, propName) as typeof prop.value) ??
            (defaultPropValues[aTypeRef.value]?.[propName] as typeof prop.value) ??
            (defaultPropValues[DefaultType]?.[propName] as typeof prop.value)
          );
        }
      );
    }

    return computedProperties;
  }

  return { getComputedPropertiesFromProps };
}

export * from "./types";
