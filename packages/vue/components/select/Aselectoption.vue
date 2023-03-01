<template lang="pug">
div(class="flex flex-col space-y-1 sm:flex-row sm:space-y-0 items-center select-none" :class="cc")
  label(:for="id" class="items-center text-sm font-medium whitespace-pre" :class="[nolabel ? 'hidden': 'inline-flex', clabelc]")
    slot {{ tr(CASelectoptionName, "options")}}
  select(:id="id" :name="id" :disabled="disabled" @change="change($event)" 
    class="block disabled:(opacity-50 cursor-not-allowed)"
    :class="cvc")
    option(v-if="!v" hidden disabled :selected="!v" value) 
      slot(name="initSelectoption") -- {{ tr(CASelectoptionName, "select")}} --
    option(v-for="option, i in options" :key="option.id" :value="option.id" :selected="option.id===v" :class="coptionc") {{ option.name }}
</template>

<script lang="ts">
export default {
	name: "Aselectoption",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IASelectoptionProps, IASelectoptionEmits } from "@agufaui/theme";
import { CASelectoptionName } from "@agufaui/theme";
import { useVue, useLocale } from "@agufaui/usevue";

const defaultPropValues = {
	// #region props
	// #endregion props
};

const props = defineProps<IASelectoptionProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IASelectoptionProps>(
	props,
	CASelectoptionName,
	defaultPropValues
);

const { cc, clabelc, cvc, coptionc } = computedProperties;

const emits = defineEmits<IASelectoptionEmits>();

const change = (e: Event) => {
	const target = e.target as HTMLSelectElement;
	emits("select", target.value);
};

const { tr } = useLocale();
</script>
