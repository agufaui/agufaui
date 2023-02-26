<template lang="pug">
div(class="relative select-none" :class="[cdisplay, cc]")
  textarea(:value="v" :id="id" :name="id"
    v-bind="$attrs"
    :maxlength="maxlength" :aria-describedby="id" placeholder=" ", :disabled="disabled" :aria-disabled="disabled"
    :class="cvc"
    @input="input($event)")
  label(:for="id" v-if="label" class="absolute top-0 py-2 px-3 -z-1" :class="clabelc") {{ label }}
</template>

<script lang="ts">
export default {
	name: "Atextarea",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IATextareaProps, IATextareaEmits } from "@agufaui/theme";
import { CATextareaName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";

const defaultPropValues = {
	// #region props
	display: "block",
	// #endregion props
};

const props = defineProps<IATextareaProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IATextareaProps>(
	props,
	CATextareaName,
	defaultPropValues
);

const { cdisplay, cvc, cc, clabelc } = computedProperties;

const emits = defineEmits<IATextareaEmits>();

const input = (e: Event) => {
	const target = e.target as HTMLTextAreaElement;
	emits("update:v", target.value);
};
</script>
