<script>
	import { onMount } from 'svelte'

	export let params

    let data = params.data
	console.log(data);
</script>

<main>
	<h1>Hello user!</h1>
	<p><a href="http://localhost:8080/">Logout</a></p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #1261a0;
		text-transform: uppercase;
		font-size: 3em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>