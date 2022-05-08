<script>
    import router from "page"

    let username = '';
    let password = '';

    let username_exists = true;
    let incorrect_password = false;

    async function login() {
        username_exists = true;
        incorrect_password = false;

        let name = {
            username: username
        };

        let user = {
            name: username,
            password: password
        };
        
        let existing_name = await fetch('http://127.0.0.1:5000/find-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(name)
        });
        let test = await existing_name.json()
        if (existing_name.status == 404)
        {
            username_exists = false;
        }
        let existing_account = await fetch('http://127.0.0.1:5000/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (existing_account.status == 404)
        {
            incorrect_password = true;
        }
        if (username_exists && !incorrect_password)
        {
            let data = await existing_account.json()
            // console.log(string)
            router('/home/' + data['username']);
        }
    }
</script>

<main>
	<h1>Login</h1>
    <input bind:value={username} placeholder="username">
    <input bind:value={password} placeholder="password" type="password">
    <button on:click={login}>Login</button>
    {#if !username_exists}
        <p style="color: red">Username does not exist!</p>
    {/if}
    {#if incorrect_password}
        <p style="color: red">Incorrect password!</p>
    {/if}
	<p>Don't have an account? Create one <a href="http://localhost:8080/register">here</a>.</p>
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