<template lang="pug">
a-alert(:show="show" v-bind="$attrs" :atype="error? 'red' : 'green'" :closable="true" :aclass="caclass" @closea="closea")
  template(#default)
    slot {{ msg }}
</template>

<script lang="ts">
export default {
	name: "AAlertError",
	inheritAttrs: false,
};
</script>

<script setup lang="ts">
import AAlert from "../alert/AAlert.vue";
import type { IAAlertErrorProps, IAAlertErrorEmits } from "@agufaui/theme";
import { CAAlertErrorName } from "@agufaui/theme";
import type { IConfig } from "@agufaui/config";
import { CConfigProvideName } from "@agufaui/config";
import { useVue } from "@agufaui/usevue";
import { inject } from "vue";

const props = defineProps<IAAlertErrorProps>();

let config = inject<IConfig>(CConfigProvideName);

const { getComputedFromProps } = useVue();

const computedProperties = getComputedFromProps<IAAlertErrorProps>(props, CAAlertErrorName, config);

const { caclass } = computedProperties;

const emits = defineEmits<IAAlertErrorEmits>();

const closea = () => {
	emits("closea");
};
</script>
