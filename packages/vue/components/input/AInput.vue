<template lang="pug">
div(class="relative select-none" :class="[cdisplay, caclass]")
  input(:value="v"
				:type="ctype"
				:id="cid"
				:name="cid"
        placeholder=" "
				maxlength="255"
				:disabled="disabled"
        v-bind="$attrs"
				:class="ciclass"
        @input="input($event)")
  label(:for="id"
				v-if="label"
				class="absolute top-0 py-2 px-3 -z-1" 
				:class="clclass") {{ label }}
</template>

<script lang="ts">
export default {
	name: "AInput",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAInputProps, IAInputEmits } from "@agufaui/theme";
import { CAInputName } from "@agufaui/theme";
import type { IConfig } from "@agufaui/config";
import { CConfigProvideName } from "@agufaui/config";
import { useVue } from "@agufaui/usevue";
import { inject } from "vue";

const props = withDefaults(defineProps<IAInputProps>(), {
	// #region props
	type: "text",
	display: "block",
	// #endregion props
});

let config = inject<IConfig>(CConfigProvideName);

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAInputProps>(props, CAInputName, config);

const { ctype, cid, cdisplay, ciclass, caclass, clclass } = computedProperties;

const emits = defineEmits<IAInputEmits>();

const input = (e: Event) => {
	const target = e.target as HTMLInputElement;
	emits("update:v", target.value);
};
</script>
