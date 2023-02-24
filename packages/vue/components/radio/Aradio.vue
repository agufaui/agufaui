<template lang="pug">
div(v-bind="$attrs" :class="cc")
  label(:for="id" :class="clabelc") {{ label }}
  fieldset(:disabled="disabled" class="border-0 cursor-pointer disabled:(opacity-50 cursor-default)" :class="cfieldsetc")
    legend(class="sr-only") {{v.name}}
    ul(class="!list-none !p-0 !m-0 bg-white rounded-md -space-y-px")
      li(v-for="option, i in options" :key="option.id" @click="select(option)" class="!list-none cursor-inherit rounded-t-md flex items-center" :class="[v.id === option.id ? cselectedc : '', coptionc]")
        input(:name="id" type="radio" :checked="v.id === option.id" class="cursor-inherit" :class="cvc" aria-describedby="radio option")
        label(class="cursor-inherit" :class="cdisplayc") {{option.name}}
</template>

<script lang="ts">
export default {
	name: "Aradio",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IARadioProps, IARadioEmits, TRadioOption } from "@agufaui/theme";
import { CARadioName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";

const defaultPropValues = {
	// #region props
	// #endregion props
};

const props = defineProps<IARadioProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IARadioProps>(
	props,
	CARadioName,
	defaultPropValues
);

const { clabelc, cc, cvc, cdisplayc, coptionc, cfieldsetc, cselectedc } = computedProperties;

const emits = defineEmits<IARadioEmits>();

const select = (option: TRadioOption) => {
	emits("select", option);
};
</script>
