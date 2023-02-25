<script lang="ts">
	import { AalertError } from "@agufaui/svelte";
</script>

<AalertError v="text" show={true} error={true} on:close={() => alert("hi")} />
<AalertError v="text" show={true} error={false} />
