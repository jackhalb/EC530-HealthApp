<script>
	export let params
	import { onMount } from 'svelte'

	let data = []

	onMount(async () => {
		let cred = params.data
		let name = {
        	username: cred
    	};
		let user_data = await fetch('http://127.0.0.1:5000/find-user', {
            	method: 'POST',
            	headers: {
            	    'Content-Type': 'application/json'
            	},
            	body: JSON.stringify(name)
        	});
		data = await user_data.json()
		console.log(data)
	});

	// console.log(data)

    
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