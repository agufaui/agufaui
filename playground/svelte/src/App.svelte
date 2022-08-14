<script lang="ts">
	import { onMount } from "svelte";
	import { AButton, AAlert, AAlertError, AInput } from "@agufaui/svelte";
	// let AButton;
	// onMount(async () => {
	// 	AButton = (await import('https://unpkg.com/@agufaui/svelte')).default
	// })
	let text = "";
	$: console.log(text);
</script>

<main>
	<AButton text="click me" on:click={(e) => console.log(e.detail)} />
	<AAlert msg="text" show={true} atype="red" />
	<AAlertError msg="text" show={true} error={true} on:closea={() => alert("hi")} />
	<AAlertError msg="text" show={true} error={false} />
	<AInput
		modelValue={text}
		label="text"
		on:update:modelValue={(e) => (text = e.detail)}
		cclass="my-2"
		atype="inlineblock"
	/>
	<!-- {#if AButton}
	 <svelte:component this={AButton} text="cick me" />
{:else}
	 <p>Loading...</p>
{/if} -->
</main>
