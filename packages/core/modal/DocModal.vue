<!-- #region showcase -->
<template>
	<div class="flex gap-y-2">
		<abutton
			v="Show modal"
			c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
			@click="show = true"
		/>
		<amodal :show="show" closable @close="show = false">
			<div class="sm:flex sm:items-start">
				<div
					class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
				>
					<span class="i-bi:exclamation-octagon h-6 w-6 text-red-4"></span>
				</div>
				<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
					<h3 id="modal-headline" class="text-lg leading-6 font-medium !text-gray-9 !mt-2">
						Delete
					</h3>
					<div class="mt-2">
						<p class="text-sm text-gray-500">
							Are you sure you want to deactivate your account? All of your data will be permanently
							removed from our servers forever. This action cannot be undone.
						</p>
					</div>
				</div>
			</div>
			<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
				<abutton
					v="Delete"
					c="text-white bg-red-5 hover:bg-red-600 sm:(ml-3 w-auto text-sm)"
					@click="close"
				/>
				<abutton
					v="Cancel"
					c="mt-3 outline outline-gray-3 text-gray-7 hover:text-gray-5 sm:(mt-0 w-auto text-sm)"
					@click="close"
				/>
			</div>
		</amodal>
	</div>
</template>

<script lang="ts">
export default {
	name: "DocModal",
};
</script>

<script setup lang="ts">
const show = ref(false);

const close = () => {
	show.value = false;
};
</script>
<!-- #endregion showcase -->
