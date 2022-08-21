<template lang="pug">
div(class="relative select-none" :class="[cdisplay, cc]")
  input(:value="v"
				:type="ctype"
				:id="cid"
				:name="cid"
        placeholder=" "
				maxlength="255"
				:disabled="disabled"
				:aria-disabled="disabled"
        v-bind="$attrs"
				:class="cvc"
        @input="input($event)")
  label(:for="id"
				v-if="label"
				class="absolute top-0 py-2 px-3 -z-1" 
				:class="clabelc") {{ label }}
</template>

<script lang="ts">
export default {
	name: "Ainput",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAInputProps, IAInputEmits } from "@agufaui/theme";
import { CAInputName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";

const defaultPropValues = {
	// #region props
	type: "text",
	display: "block",
	// #endregion props
};

const props = defineProps<IAInputProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAInputProps>(
	props,
	CAInputName,
	defaultPropValues
);

const { ctype, cid, cdisplay, cvc, cc, clabelc } = computedProperties;

const emits = defineEmits<IAInputEmits>();

const input = (e: Event) => {
	const target = e.target as HTMLInputElement;
	emits("update:v", target.value);
};
</script>
