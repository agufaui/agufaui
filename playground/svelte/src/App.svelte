<script lang="ts">
	import { Router, Link, Route } from "svelte-routing";
	import Basic from "./routes/Basic.svelte";
	import Utility from "./routes/Utility.svelte";
	import Navigation from "./routes/Nav.svelte";
</script>

<Router>
	<nav>
		<Link to="/">Basic</Link>
		<Link to="utility">Utility</Link>
		<Link to="navigation">Navigation</Link>
	</nav>
	<div>
		<Route path="/utility" component={Utility} />
		<Route path="/navigation" component={Navigation} />
		<Route path="/"><Basic /></Route>
	</div>
</Router>
