<template lang="pug">
a(v-bind="$attrs"
	class="flex items-center"
	:class="[ci && v ? cspacex : '', cipos === 'right' ? 'flex-row-reverse space-x-reverse' : '', cc]"
	:href="href")
	slot
		span(class="flex-shrink-0" v-if="ci" :class="[ci, cic]")
		span(:class="ctitlesc")
			p(:class="cvc") {{ v }}
				slot(name="badge")
					asup(v-if="badges" :c="cbadgesc")
							abadge(v-for="badge, i in badges" :key="i" v-bind="badge")
			p(v-if="subtitle" :class="csubtitlec") {{ subtitle }}
</template>

<script lang="ts">
export default {
	name: "Amlink",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAMlinkProps } from "@agufaui/theme";
import { CAMlinkName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";
import Asup from "../superscript/Asup.vue";
import Abadge from "../badge/Abadge.vue";

const defaultPropValues = {
	// #region props
	// #endregion props
};

const props = defineProps<IAMlinkProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAMlinkProps>(
	props,
	CAMlinkName,
	defaultPropValues
);

const { cc, cspacex, cipos, ci, cic, ctitlesc, cbadgesc, cvc, csubtitlec } = computedProperties;
</script>
