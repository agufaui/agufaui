<template lang="pug">
span(
  v-bind="$attrs"
	v-if="show"
  class="inline-flex justify-center items-center"
  :class="[cspacex, cpos === 'right' ? 'flex-row-reverse space-x-reverse' : '', cc]"
)
	span(:class="cvc") 
		slot {{ v }}
	span(class="flex-shrink-0 cursor-pointer" :class="[ccloseicon, cclosec]" @click.stop="click")
</template>

<script lang="ts">
export default {
	name: "Atag", // name field must be specified for plugin (global component registration) to work
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IATagProps, IATagEmits } from "@agufaui/theme";
import { CATagName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";
import { ref } from "vue";

const defaultPropValues = {
	// #region props
	spacex: "space-x-1.5",
	closeicon: "i-iwwa:delete",
	// #endregion props
};

const props = defineProps<IATagProps>();

let show = ref(true);

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IATagProps>(props, CATagName, defaultPropValues);

const { cc, cvc, cpos, ccloseicon, cclosec, cspacex } = computedProperties;

const emits = defineEmits<IATagEmits>();

const click = () => {
	show.value = false;
	emits("close", props.v!);
};
</script>
