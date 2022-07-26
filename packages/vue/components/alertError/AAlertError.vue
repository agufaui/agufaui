<template lang="pug">
a-alert(:show="cShow" v-bind="$attrs" :a-Type="cError? 'red' : 'green'" :closeable="true" :a-class="cAClass" @closea="closea(false)")
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
import { DAAlertError } from "@agufaui/theme";
import type { IConfig } from "@agufaui/config";
import { aUseVueComponent } from "@agufaui/use";
import { inject } from "vue";

const props = defineProps<IAAlertErrorProps>();

let config = inject<IConfig>("agufaUIConfig");

const component = "aalertError";

const { getComputedPropertiesFromProps } = aUseVueComponent();

const computedProperties = getComputedPropertiesFromProps<IAAlertErrorProps>(
  props,
  component,
  config,
  DAAlertError
);

const { cShow, cError, cAClass } = computedProperties;

const emits = defineEmits<IAAlertErrorEmits>();

const closea = (show: boolean) => {
  emits("closea", show);
};
</script>
