<script lang="ts">
	import { Router, Link, Route } from "svelte-routing";
	import Basic from "./routes/Basic.svelte";
	import Utility from "./routes/Utility.svelte";
	import Navigation from "./routes/Nav.svelte";
	import Form from "./routes/Form.svelte";
	import Table from "./routes/Table.svelte";
</script>

<Router>
	<nav>
		<Link to="/">Basic</Link>
		<Link to="utility">Utility</Link>
		<Link to="navigation">Navigation</Link>
		<Link to="form">Form</Link>
		<Link to="table">Table</Link>
	</nav>
	<div>
		<Route path="/utility" component={Utility} />
		<Route path="/navigation" component={Navigation} />
		<Route path="/form" component={Form} />
		<Route path="/table" component={Table} />
		<Route path="/"><Basic /></Route>
	</div>
</Router>
