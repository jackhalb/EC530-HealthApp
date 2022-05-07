<script>
	import router from "page"
	import Home from '../components/Home.svelte'
	import Login from '../components/Login.svelte'
	import Register from '../components/Register.svelte'

	let page;
	let params;

	router('/', () => page = Login)
	router('/register', () => page = Register)
	router('/home/:data', (ctx, next) => {
		params = ctx.params;
		next()
	}, () => page = Home)

	router.start()
</script>

{#if page === Home}
	<Home {params} />
{/if}

{#if page === Login}
	<Login />
{/if}

{#if page === Register}
	<Register />
{/if}