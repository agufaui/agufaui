<template lang="pug">
label(class="inline-flex items-center" :class="[{'cursor-pointer': !disabled}, cc]")
  input(type="checkbox" :checked="v" :disabled="disabled"
    class="hidden peer"
    :class="cinputc"
    @input="click($event)")
  div(v-bind="$attrs" class=`flex items-center justify-center shrink-0 select-none
    peer-checked:(outline-none bg-current shadow ring-2 ring-offset-2)
    cursor-pointer peer-disabled:(opacity-50 cursor-default)` :class="cvc")
    span(class="[:not(peer-checked)]:hidden" :class="[ci, cic]")
  slot {{ label ?? "" }}
</template>

<script lang="ts">
export default {
	name: "Acheckbox",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IACheckboxProps, IACheckboxEmits } from "@agufaui/theme";
import { CACheckboxName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";
import { ref } from "vue";

let checked = ref(false);

const defaultPropValues = {
	// #region props
	i: "i-ic:baseline-check",
	// #endregion props
};

const props = defineProps<IACheckboxProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IACheckboxProps>(
	props,
	CACheckboxName,
	defaultPropValues
);

const { cvc, cc, ci, cic, cinputc } = computedProperties;

const emits = defineEmits<IACheckboxEmits>();

const click = (e: MouseEvent) => {
	checked.value = !checked.value;
	emits("click", e);
};
</script>
