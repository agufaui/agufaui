<template lang="pug">
a-alert(:show="cshow" v-bind="$attrs" :atype="cerror? 'red' : 'green'" :closeable="true" :aclass="caclass" @closea="closea(false)")
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
import { aUseVueComponent } from "@agufaui/use";
import { inject } from "vue";

const props = defineProps<IAAlertErrorProps>();

let config = inject<IConfig>(CConfigProvideName);

const { getComputedPropertiesFromProps } = aUseVueComponent();

const computedProperties = getComputedPropertiesFromProps<IAAlertErrorProps>(
  props,
  CAAlertErrorName,
  config
);

const { cshow, cerror, caclass } = computedProperties;

const emits = defineEmits<IAAlertErrorEmits>();

const closea = (show: boolean) => {
  emits("closea", show);
};
</script>
