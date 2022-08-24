<script lang="ts">
	import { onMount } from "svelte";
	import type { Writable } from "svelte/store";
	import { get } from "svelte/store";
	import {
		Abutton,
		Aalert,
		AalertError,
		Ainput,
		Asup,
		Atag,
		Aa,
		Amtoggle,
		configStore,
		Ampanel,
		Amflyout,
	} from "@agufaui/svelte";
	// let AButton;
	// onMount(async () => {
	// 	AButton = (await import('https://unpkg.com/@agufaui/svelte')).default
	// })
	let text = "";
	let open = false;
	$: console.log("text", text);
	const click = () => {
		const locale = $configStore.locale as Writable<string>;
		if (get(locale) === "en") {
			locale.set("zh-cn");
		} else {
			locale.set("en");
		}
		configStore.set($configStore);
	};
	let links = [
		{
			title: "Google",
			href: "https://google.com",
			icon: "i-logos:google-icon",
			subtitle: "Google Site",
		},
		{
			title: "Github",
			href: "https://github.com",
			icon: "i-logos:github-icon",
			subtitle: "Github Site",
		},
	];
</script>

<main>
	<Abutton v="click me" on:click={(e) => console.log(e.detail)} />
	<Abutton v="click me" on:click={click} />
	<Aalert v="Text" show={true} t="red" />
	<AalertError v="text" show={true} error={true} on:close={() => alert("hi")} />
	<AalertError v="text" show={true} error={false} />
	<Ainput v={text} label="text" on:update:v={(e) => (text = e.detail)} c="my-2" t="inlineblock" />
	<Aa v="text" />
	<Asup v="text" />
	<Atag v="text" />
	<Amtoggle {open} on:click={() => (open = !open)} />
	<Ampanel {links} t="flyout" c="dark:bg-white" titlec="dark:text-gray-900" />
	<div class="flex h-sm">
		<Amflyout v="Sites" {links} vc="dark:text-white dark:hover:text-gray-900" />
	</div>
	<!-- {#if AButton}
	 <svelte:component this={AButton} text="cick me" />
{:else}
	 <p>Loading...</p>
{/if} -->
</main>
