<template lang="pug">
div(class="flex items-center disabled:(opacity-50 cursor-not-allowed)" v-bind="$attrs" :class="[{'cursor-pointer': clickable},cspacex, cc]")
  i(v-for="i in full" :key="'full'+i" :class="[cfulli, cvc]" @click="click(i)")
  i(v-for="i in half" :key="'half'+i" :class="[chalfi, cvc]" @click="click(full+i)")
  i(v-for="i in empty" :key="'empty'+i" :class="[cemptyi, cvc]" @click="click(full+half+i)")
</template>

<script lang="ts">
export default {
	name: "Arating", // name field must be specified for plugin (global component registration) to work
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IARatingProps, IARatingEmits } from "@agufaui/theme";
import { CARatingName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";
import { watch, ref } from "vue";

const defaultPropValues = {
	// #region props
	spacex: "space-x-1",
	emptyi: "i-material-symbols:star-outline-rounded",
	fulli: "i-material-symbols:star-rounded",
	halfi: "i-material-symbols:star-half-rounded",
	total: 5,
	// #endregion props
};

const props = defineProps<IARatingProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IARatingProps>(
	props,
	CARatingName,
	defaultPropValues
);

const { cc, cvc, cspacex, cemptyi, cfulli, chalfi, ctotal } = computedProperties;

let full = ref(0);
let half = ref(0);
let empty = ref<number>(ctotal.value);

const emits = defineEmits<IARatingEmits>();

const click = (rating: number) => {
	if (props.clickable) emits("click", rating);
};

watch(
	() => props.v,
	(v) => {
		let score = v ?? 0;

		if (!Number.isInteger(score)) {
			half.value = 1;
			score = Math.floor(score);
		} else {
			half.value = 0;
		}

		full.value = score;
		empty.value = ctotal.value - full.value - half.value;
	},
	{ immediate: true }
);
</script>
