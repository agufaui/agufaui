<script lang="ts">
	import { Apagination } from "@agufaui/svelte";
	let curPage = 1;
	const change = (e: CustomEvent) => {
		curPage = e.detail;
	};
</script>

<Apagination totalPages={50} currentPage={25} on:change={(e) => change(e)} />
<Apagination totalPages={50} currentPage={25} goto on:change={(e) => change(e)} />
<Apagination totalPages={50} currentPage={25} goto gotoPos="right" on:change={(e) => change(e)} />
