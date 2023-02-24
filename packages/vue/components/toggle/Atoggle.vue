<template lang="pug">
div(class="flex items-center" v-bind="$attrs" :class="[cspacex, clpos === 'right' ? 'flex-row-reverse space-x-reverse' : '', cc]")
  slot
    abadge(:id="id ?? 'toggleLabel'" v-bind="label" :class="clabelc")
  button(type="button" aria-pressed="false" :aria-labelledby="id ?? 'toggleLabel'" :disabled="disabled" :aria-disabled="disabled" 
    @click.stop="click($event)"
    class=`inline-flex items-center flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full transition-colors ease-in-out duration-200 
    focus:(outline-none ring-2 ring-offset-2) disabled:opacity-50`
    :class="[cbuttononfocus, v? cbuttonon : cbuttonoff, cbuttonc]")
    span(class="sr-only") {{ v? tr(CAToggleName, "on") : tr(CAToggleName, "off") }}
    span(aria-hidden="true" 
      class="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
      :class="[v? 'translate-x-5' : 'translate-x-0', ccirclec]")
</template>

<script lang="ts">
export default {
	name: "Atoggle", // name field must be specified for plugin (global component registration) to work
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAToggleProps, IAToggleEmits } from "@agufaui/theme";
import { CAToggleName } from "@agufaui/theme";
import { useVue, useLocale } from "@agufaui/usevue";
import Abadge from "../badge/Abadge.vue";

const defaultPropValues = {
	// #region props
	spacex: "space-x-1.5",
	buttonon: "bg-blue-6",
	buttononfocus: "focus:ring-blue-5",
	buttonoff: "bg-gray-2",
	// #endregion props
};

const props = defineProps<IAToggleProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAToggleProps>(
	props,
	CAToggleName,
	defaultPropValues
);

const { cc, cspacex, clpos, clabelc, cbuttononfocus, cbuttonon, cbuttonoff, cbuttonc, ccirclec } =
	computedProperties;

const emits = defineEmits<IAToggleEmits>();

const click = (e: MouseEvent) => {
	emits("click", e);
};

const { tr } = useLocale();
</script>
