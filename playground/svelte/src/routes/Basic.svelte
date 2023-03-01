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
		TPos,
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
		Atooltip,
		Alabel,
		Atextarea,
		Amodal,
		Adrawer,
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

	// drawer
	let showDrawer = false;
	let posDrawer = "left" as TPos;

	// modal
	let showModal = false;
	const closeModal = () => {
		showModal = false;
	};
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
	<Alabel v="Username" vc="dark:text-white" />
	<Atooltip v="user name" />
	<Atextarea
		v="hi"
		label="Comment"
		t="inlineblock"
		rows={5}
		vc="dark:text-white"
		labelc="dark:(bg-#242424 text-white)"
	/>
	<Abutton v="click me" on:click={(e) => (showDrawer = true)} />
	<Adrawer show={showDrawer} pos={posDrawer} on:close={() => (showDrawer = false)}>
		<nav class="flex flex-col flex-1 overflow-y-auto h-full bg-gray-8 min-w-14rem">
			<p>hi</p>
		</nav>
	</Adrawer>
	<Abutton
		v="Show modal"
		c="text-white bg-blue-5 hover:(bg-blue-6 -translate-px shadow-md shadow-blue) active:translate-px focus:(ring-offset-none ring-none)"
		on:click={() => (showModal = true)}
	/>
	<Amodal show={showModal} closable on:close={() => (showModal = false)}>
		<p>hi</p>
	</Amodal>
	<!-- {#if AButton}
	 <svelte:component this={AButton} text="cick me" />
{:else}
	 <p>Loading...</p>
{/if} -->
</main>
