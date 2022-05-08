<script>
	export let params
	import { onMount } from 'svelte'

	let data;
	let healthRecords = [];
	let cred;

	let promise = onMount(async () => {
		cred = params.data
		let username = {
        	username: cred
    	};
		let user_data = await fetch('http://127.0.0.1:5000/find-user', {
            	method: 'POST',
            	headers: {
            	    'Content-Type': 'application/json'
            	},
            	body: JSON.stringify(username)
        	});
		data = await user_data.json()
		healthRecords = data['health_records']
	});
</script>

<main>
	<h1>Hello {cred}!</h1>
	{#await promise}
		<p>waiting...</p>
	{:then}
		{#each healthRecords as healthRecord}
		<h2>{healthRecord.reading_date}</h2>
		{#each Object.entries(healthRecord) as [key, value]}
			<p>
				{key}: {value}
			</p>
		{/each}
		{/each}
	{/await}
	<h2><a href="http://localhost:8080/">Logout</a></h2>
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