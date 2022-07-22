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
import type {
  AAlertErrorProps,
  AAlertErrorEmits,
} from "../../../core/alertError/types";
import type Config from "../../../core/config";

const props = defineProps<AAlertErrorProps>();

let config = inject<Config>("agufaUIConfig");
const component = "aalertError";

const { getComputedPropertiesFromProps } = aUseVueComponent();

const computedProperties = getComputedPropertiesFromProps<AAlertErrorProps>(
  props,
  component,
  config
);

const { cShow, cError, cAClass } = computedProperties;

const emits = defineEmits<AAlertErrorEmits>();

const closea = (show: boolean) => {
  emits("closea", show);
};
</script>
