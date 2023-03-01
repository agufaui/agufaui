<template>
	<div class="flex items-center flex-wrap flex-col space-y-4">
		<!-- #region showcase -->
		<atpanel :headings="headings" :items="items" :actions="dropdownProps" multi-select c="pb-8" />
		<atpanel :headings="headings" loading />
		<atpanel :headings="headings" />
		<atpanel :headings="headingsObject" :items="itemsObj" />
		<atpanel :headings="headingsString" :items="itemsString" is-scalar-array />
		<!-- #endregion showcase -->
	</div>
</template>

<script lang="ts">
export default {
	name: "DocTpanel",
};
</script>

<script setup lang="ts">
import { TTableHeading, IADropdownButtonProps } from "@agufaui/vue";

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

const dropdownProps: IADropdownButtonProps = {
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

const headingsObject: TTableHeading[] = [
	{
		key: "id",
		display: "id",
		field: "id",
	},
	{
		key: "name",
		display: "name",
		field: "name",
	},
	{
		key: "role",
		display: "role",
		field: "role",
	},
	{
		key: "homepage",
		display: "homepage",
		type: "link",
		href: "https://agufa.tech/",
	},
	{
		key: "level",
		display: "Seniority",
		type: "event",
		event: "promote",
	},
];

const itemsObj: any[] = [
	{
		id: "1",
		name: "John",
		role: ["developer", "designer"],
		homepage: "john",
		level: "Junior",
	},
	{
		id: "2",
		name: "Mark",
		role: ["admin", "manager"],
		homepage: "mark",
		level: "Senior",
	},
];

const headingsString: TTableHeading[] = [
	{
		key: "country",
		display: "country",
		field: "country",
	},
];

const itemsString: string[] = ["United States", "Canada"];
</script>
