<template>
	<!-- #region showcase -->
	<a-alert-error msg="Alert" :show="true" :error="true" aclass="my-2" />
	<a-alert-error msg="Success" :show="true" :error="false" aclass="my-2" />
	<!-- #endregion showcase -->
</template>

<script lang="ts">
export default {
	name: "DocAlertError",
};
</script>
