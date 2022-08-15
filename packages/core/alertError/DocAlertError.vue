<template>
	<div class="flex flex-col gap-y-2">
		<!-- #region showcase -->
		<a-alert-error msg="Alert" :show="true" :error="true" />
		<a-alert-error msg="Success" :show="true" :error="false" />
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocAlertError",
};
</script>
