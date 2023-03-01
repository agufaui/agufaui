<script lang="ts">
	import { Apagination, Atpanel, Atable, Aselectoption } from "@agufaui/svelte";
	import type {
		TTableHeading,
		IADropdownButtonProps,
		IATpanelProps,
		IASelectoptionProps,
		IADropdownSelectProps,
		IAPaginationProps,
		IAButtonProps,
		TTableFilter,
		IATagProps,
		IAAlertErrorProps,
	} from "@agufaui/theme";

	// Pagination
	let curPage = 1;
	const change = (e: CustomEvent) => {
		curPage = e.detail;
	};

	// Table
	const headings: TTableHeading[] = [
		{
			key: "id",
			display: "id",
			field: "id",
		},
		{
			key: "name",
			display: "name",
			field: "name",
			direction: "asc",
		},
		{
			key: "email",
			display: "email",
			field: "email",
			direction: "desc",
		},
	];

	const items: any[] = [
		{
			id: 1,
			name: "Mark",
			email: "mark@agufa.tech",
		},
		{
			id: 2,
			name: "John",
			email: "john@agufa.tech",
		},
	];

	const actions: IADropdownButtonProps = {
		itemc: "!bg-red-5 !hover:bg-red-6 !focus:ring-red-5",
		items: [
			{
				display: "Edit",
				event: "edit",
			},
			{
				display: "Delete",
				event: "delete",
			},
		],
	};

	const tpanel: IATpanelProps = {
		headings,
		items,
		actions,
		multiSelect: true,
		c: "pb-8",
	};

	const recordsPerPageOption: IASelectoptionProps = {
		options: [
			{ id: 20, name: "20" },
			{ id: 50, name: "50" },
			{ id: 100, name: "100" },
		],
		v: 20,
		vc: "w-5rem",
	};

	const newButton: IAButtonProps = {
		t: "focus",
		c: "group text-white  bg-gradient-to-br from-green-2 to-green-6 transition-shadow duration-300 hover:via-green-6 focus:(via-green-7 ring-green-5)",
	};

	const deleteButton: IAButtonProps = {
		c: "h-2.5rem group text-white bg-orange-6 hover:bg-orange-7 focus:ring-orange-5",
	};

	const showHideColumnsOption: IADropdownSelectProps = {
		items: [
			{ key: "id", value: "id" },
			{ key: "name", value: "name" },
			{ key: "email", value: "email" },
		],
	};

	const filterSizeOption: IASelectoptionProps = {
		options: [
			{ id: "small", name: "small" },
			{ id: "mid", name: "mid" },
			{ id: "large", name: "large" },
		],
		v: "large",
	};

	const filters: TTableFilter[] = [{ field: "size", display: "size", displayValue: "large" }];

	const tagProps: IATagProps = {
		t: "round",
		c: "text-white bg-gradient-to-br from-blue-2 to-green-5 shadow-md shadow-green-3",
	};

	const alert: IAAlertErrorProps = {
		show: true,
		error: true,
		v: "Cannot create new record: Duplicate IDs",
	};

	const pagination: IAPaginationProps = {
		totalPages: 50,
	};
</script>

<Apagination totalPages={50} currentPage={25} on:change={(e) => change(e)} />
<Apagination totalPages={50} currentPage={25} goto on:change={(e) => change(e)} />
<Apagination totalPages={50} currentPage={25} goto gotoPos="right" on:change={(e) => change(e)} />

<Atable
	panel={tpanel}
	{recordsPerPageOption}
	{newButton}
	{deleteButton}
	{showHideColumnsOption}
	{filters}
	{tagProps}
	{alert}
	{pagination}
	offset={0}
	totalRecords={200}
	showPages
	ifNew
	ifDelete
	ifFilter
	ifSearch
>
	<template slot="filterPanel">
		<Aselectoption {...filterSizeOption}>Size</Aselectoption>
	</template>
</Atable>
