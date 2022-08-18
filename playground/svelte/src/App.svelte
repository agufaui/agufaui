<script lang="ts">
	import { onMount } from "svelte";
	import { Abutton, Aalert, AalertError, Ainput, Asup, Atag, Aa } from "@agufaui/svelte";
	// let AButton;
	// onMount(async () => {
	// 	AButton = (await import('https://unpkg.com/@agufaui/svelte')).default
	// })
	let text = "";
	$: console.log(text);
</script>

<main>
	<Abutton v="click me" on:click={(e) => console.log(e.detail)} />
	<Aalert v="Text" show={true} t="red" />
	<AalertError v="text" show={true} error={true} on:close={() => alert("hi")} />
	<AalertError v="text" show={true} error={false} />
	<Ainput v={text} label="text" on:update:v={(e) => (text = e.detail)} c="my-2" t="inlineblock" />
	<Aa v="text" />
	<Asup v="text" />
	<Atag v="text" />
	<!-- {#if AButton}
	 <svelte:component this={AButton} text="cick me" />
{:else}
	 <p>Loading...</p>
{/if} -->
</main>
