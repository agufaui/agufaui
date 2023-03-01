<template lang="pug">
adrawer(:show="show" @close="close")
  div(class="relative flex-1 flex flex-col h-full" :class="csidebarc")
    slot(name="header")
    nav(class="flex flex-col flex-1 overflow-y-auto" :class="cmpanelc")
      ampanel(v-bind="{...mpanel, ...$attrs}")
    slot(name="footer")
</template>

<script lang="ts">
export default {
	name: "Ammmsidebar",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import type { IAMmsidebarProps, IAMmsidebarEmits } from "@agufaui/theme";
import { CAMmsidebarName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";
import Adrawer from "../drawer/Adrawer.vue";
import Ampanel from "../menuPanel/Ampanel.vue";

const defaultPropValues = {
	// #region props
	closei: "i-ph:x-bold",
	// #endregion props
};

const props = defineProps<IAMmsidebarProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAMmsidebarProps>(
	props,
	CAMmsidebarName,
	defaultPropValues
);

const { cc, coverlayc, cclosec, cclosei, ccloseic, csidebarc, cmpanelc } = computedProperties;

const emits = defineEmits<IAMmsidebarEmits>();

const close = () => {
	emits("close");
};
</script>
