<template>
	<div class="flex flex-col gap-y-2">
		<!-- #region showcase -->
		<aalert-error v="Alert" :show="true" :error="true" />
		<aalert-error v="Success" :show="true" :error="false" />
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocAlertError",
};
</script>
