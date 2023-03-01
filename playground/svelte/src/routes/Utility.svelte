<script lang="ts">
	import { AalertError, Arating } from "@agufaui/svelte";
	let score = 0;
	const rating = (rateEvent: CustomEvent<number>) => {
		console.log(rateEvent.detail);
		score = rateEvent.detail as number;
	};
</script>

<AalertError v="text" show={true} error={true} on:close={() => alert("hi")} />
<AalertError v="text" show={true} error={false} />
<Arating v="3.5" />
<Arating v={score} clickable on:click={(e) => rating(e)} />
