<template lang="pug">
button(
  role="button"
  :type="ctype"
  v-bind="$attrs"
  class="flex-inline justify-center items-center select-none cursor-pointer"
  :disabled="disabled || loading"
  :class="caclass"
  @click.stop="click($event)"
)
  slot
    div(class="flex justify-center items-center" :class="cicon || loading ? cspacex : ''")
      span(v-if="text && cipos === 'right'" :class="ctclass") {{ text }}
      div(v-if="loading" class="animate-spin preserve-3d" :class="[clicon, clclass]")
      div(v-else-if="cicon" :class="[cicon, ciclass]")
      span(v-if="text && cipos === 'left'" :class="ctclass") {{ text }}
</template>

<script lang="ts">
export default {
	name: "AButton", // name field must be specified for plugin (global component registration) to work
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAButtonProps, IAButtonEmits } from "@agufaui/theme";
import { CAButtonName } from "@agufaui/theme";
import type { IConfig } from "@agufaui/config";
import { CConfigProvideName } from "@agufaui/config";
import { useVue } from "@agufaui/usevue";
import { inject } from "vue";

const props = withDefaults(defineProps<IAButtonProps>(), {
	// #region props
	type: "button",
	ipos: "left",
	licon: "i-eos-icons:loading",
	spacex: "space-x-1.5",
	// #endregion props
});

let config = inject<IConfig>(CConfigProvideName);

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAButtonProps>(props, CAButtonName, config);

const { ctype, caclass, ctclass, cicon, cipos, ciclass, clicon, clclass, cspacex } =
	computedProperties;

const emits = defineEmits<IAButtonEmits>();

const click = (e: MouseEvent) => {
	emits("click", e);
};
</script>
