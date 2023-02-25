<script lang="ts">
	import { onMount } from "svelte";
	import type { Writable } from "svelte/store";
	import { get } from "svelte/store";
	import type {
		IABadgeProps,
		TRadioOption,
		TSelectOption,
		TDropdownItem,
		TDropdownButtonItem,
	} from "@agufaui/theme";
	import {
		configStore,
		Abutton,
		Aalert,
		Ainput,
		Asup,
		Atag,
		Aa,
		Atoggle,
		Acheckbox,
		Aradio,
		Aselect,
		Adropdown,
		Adropdownbutton,
		Asearch,
	} from "@agufaui/svelte";
	// let AButton;
	// onMount(async () => {
	// 	AButton = (await import('https://unpkg.com/@agufaui/svelte')).default
	// })

	// Abutton
	const click = () => {
		const locale = $configStore.locale as Writable<string>;
		if (get(locale) === "en") {
			locale.set("zh-cn");
		} else {
			locale.set("en");
		}
		configStore.set($configStore);
	};

	let text = ""; // Ainput
	$: console.log("text", text); // Ainput

	let searchtext = ""; // Asearch

	let on = false; // Atoggle
	// Atoggle
	let label: IABadgeProps = {
		v: "left label",
		t: "label",
	};

	let checked = false; // Acheckbox

	let selected: TRadioOption = { id: "", name: "" }; // Aradio
	// Aradio
	const options: TRadioOption[] = [
		{
			id: "US",
			name: "United States",
		},
		{
			id: "CA",
			name: "Canada",
		},
	];
	// Aradio
	const assign = (obj: TRadioOption, updateObj: TRadioOption) => {
		Object.assign(obj, updateObj);
	};

	let selectedSelect: TSelectOption = { id: "", name: "" }; // select
	// select
	const optionsSelect: TSelectOption[] = [
		{
			id: "US",
			name: "United States",
			display: "United States",
		},
		{
			id: "CA",
			name: "Canada",
		},
	];
	// select
	const assignSelect = (obj: TSelectOption, updateObj: TSelectOption) => {
		Object.assign(obj, updateObj);
		if (!updateObj.display) {
			delete obj.display;
		}
	};

	// dropdown
	const itemsDropdown: TDropdownItem[] = [
		{
			label: "Google",
			href: "https://google.com",
		},
		{
			label: "Github",
			href: "https://github.com",
		},
	];

	// dropdownButton
	const itemsDropdownButton: TDropdownButtonItem[] = [
		{
			icon: "i-ic:outline-edit",
			display: "Edit",
			event: "edit",
		},
		{
			icon: "i-material-symbols:delete-outline",
			display: "Delete",
			event: "delete",
		},
		{
			icon: "i-material-symbols:save-as-outline",
			display: "Save",
			event: "save",
		},
	];
</script>

<main>
	<Abutton v="click me" on:click={(e) => console.log(e.detail)} />
	<Abutton v="click me" on:click={click} />
	<Aalert v="Text" show={true} t="red" />
	<Ainput v={text} label="text" on:update:v={(e) => (text = e.detail)} c="my-2" t="inlineblock" />
	<Aa v="text" />
	<Asup v="text" />
	<Atag v="text" />
	<Atoggle v={on} {label} on:click={() => (on = !on)} />
	<Acheckbox v={checked} t="green" on:click={() => (checked = !checked)} />
	<Aradio v={selected} label="country" {options} on:select={(e) => assign(selected, e)} />
	<Aselect
		v={selectedSelect}
		label="country"
		fullwidth={true}
		options={optionsSelect}
		on:select={(e) => assignSelect(selectedSelect, e)}
	/>
	<Adropdown v="options" items={itemsDropdown} />
	<Adropdownbutton items={itemsDropdownButton} />
	<Asearch v={searchtext} vc="dark:text-white" on:update:v={(e) => (text = e)} />
	<!-- {#if AButton}
	 <svelte:component this={AButton} text="cick me" />
{:else}
	 <p>Loading...</p>
{/if} -->
</main>
