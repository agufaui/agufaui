import type { AUseVueComponentReturn } from "./types";
import { ComputedRef } from "vue";
import type Config from "../../../core/config";
import { aUseStringUtils } from "../aUseStringUtils";

export function aUseVueComponent(): AUseVueComponentReturn {
  function getColorCSS(color: String): String {
    switch (color) {
      case "blue":
        return "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";
      case "green":
        return "bg-green-600 hover:bg-green-700 focus:ring-green-500";
      case "gray":
        return "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500";
      case "red":
        return "bg-red-600 hover:bg-red-700 focus:ring-red-500";
      default:
        return "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
    }
  }

  function getComputedPropertiesFromProps<T>(
    props: Readonly<T>,
    component: string,
    config: Config | undefined
  ): Record<string, ComputedRef> {
    const computedProperties: Record<string, ComputedRef> = {};
    const aTypeRef = toRef(props, "aType" as keyof T);
    const { firstLetterToUpper } = aUseStringUtils();

    for (const propName in props) {
      if (["aType", "text"].includes(propName)) continue;

      const prop = toRef(props, propName as keyof T);
      const computedName = "c" + firstLetterToUpper(propName);
      computedProperties[computedName as keyof typeof computedProperties] =
        computed((): typeof prop.value => {
          return (
            prop.value ||
            (config?.getDefault(
              component,
              aTypeRef.value,
              propName
            ) as typeof prop.value)
          );
        });
    }

    return computedProperties;
  }

  return { getColorCSS, getComputedPropertiesFromProps };
}
