<script>
    import router from "page"

    let username = '';
    let password = '';

    function login() {
        


        router('/home')
    }
</script>

<main>
	<h1>Hello user! Please login.</h1>
    <input bind:value={username} placeholder="username">
    <input bind:value={password} placeholder="password" type="password">
    <button on:click|once={login}>Login</button>
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