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
import type { IConfig } from "@agufaui/config";
import { CConfigProvideName } from "@agufaui/config";
import { useVue } from "@agufaui/usevue";
import { ref, inject } from "vue";

const props = withDefaults(defineProps<IATagProps>(), {
	// #region props
	spacex: "space-x-1.5",
	closeicon: "i-iwwa:delete",
	// #endregion props
});

let show = ref(true);

let config = inject<IConfig>(CConfigProvideName);

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IATagProps>(props, CATagName, config);

const { cc, cvc, cpos, ccloseicon, cclosec, cspacex } = computedProperties;

const emits = defineEmits<IATagEmits>();

const click = () => {
	show.value = false;
	emits("close", props.v!);
};
</script>
