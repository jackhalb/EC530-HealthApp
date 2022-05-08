<script>
    let username = '';
	let password1 = '';
	let password2 = '';
	let admin = false;
	let doctor = false;
	let patient = false;
	let username_exists = false;
	let passwords_match = true;
	let success = false;

	async function register() {

		let name = {
			username: username
		}

		let credentials = {
			patient: patient,
			doctor: doctor,
			admin: admin
		}

		let options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}

		let date = new Date().toLocaleString('en-US', options)
		date = date.replace(',', '')

		let userData = {
			username: username,
			password: password1,
			credentials: credentials,
			health_records: [],
			account_creation_time: date
		}

		let user_info = {
			user_info: userData
		}

		let existing_name = await fetch('http://127.0.0.1:5000/find-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(name)
        });

		if (existing_name.status != 404)
        {
            username_exists = true;
        }

		if (password1 !== password2)
		{
			passwords_match = false;
		}

		if (!username_exists && passwords_match)
		{
			let create = await fetch('http://127.0.0.1:5000/add-new-user', {
           		method: 'POST',
            	headers: {
            	    'Content-Type': 'application/json'
            	},
            	body: JSON.stringify(user_info)
        	});

			if (create.status == 200)
			{
				success = true;
			}
		}
	}

	

	
</script>

<main>
	<h1>Register</h1>
	<p>Please enter a new username and password to create an account.</p>
	{#if username_exists}
        <p style="color: red">Username already exists!</p>
    {/if}
	{#if !passwords_match}
        <p style="color: red">Passwords do not match!</p>
    {/if}
	{#if success}
        <p style="color: green">Account created successfully! You can now login.</p>
    {/if}
	<input bind:value={username} placeholder="Enter a username">
	<br>
    <input bind:value={password1} placeholder="Enter a password" type="password">
	<br>
	<input bind:value={password2} placeholder="Reenter password" type="password">
	<p>Select a role: </p>
	<label>
		<input type=checkbox bind:checked={admin}>
		Admin
	</label>
	<label>
		<input type=checkbox bind:checked={doctor}>
		Doctor
	</label>
	<label>
		<input type=checkbox bind:checked={patient}>
		Patient
	</label>
	<br>
	<br>
	<button on:click={register}>Create Account</button>
	<p><a href="http://localhost:8080/">Back to Login</a></p>
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