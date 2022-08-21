<template lang="pug">
aalert(:show="show" v-bind="$attrs" :t="error? cerrorAAlertType : csuccessAAlertType" :closable="true" :c="cc" @close="close")
  template(#default)
    slot {{ v }}
</template>

<script lang="ts">
export default {
	name: "AalertError",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import Aalert from "../alert/Aalert.vue";
import type { IAAlertErrorProps, IAAlertErrorEmits } from "@agufaui/theme";
import { CAAlertErrorName } from "@agufaui/theme";
import { useVue } from "@agufaui/usevue";

const defaultPropValues = {};

const props = defineProps<IAAlertErrorProps>();

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAAlertErrorProps>(
	props,
	CAAlertErrorName,
	defaultPropValues
);

const { cc, cerrorAAlertType, csuccessAAlertType } = computedProperties;

const emits = defineEmits<IAAlertErrorEmits>();

const close = () => {
	emits("close");
};
</script>
