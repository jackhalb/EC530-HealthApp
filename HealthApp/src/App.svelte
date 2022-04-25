<script>
	import router from "page"
	import Home from '../components/Home.svelte'
	import Login from '../components/Login.svelte'
	import Register from '../components/Register.svelte'

	let page;

	router('/', () => page = Login)
	router('/register', () => page = Register)
	router('/home', () => page = Home)

	router.start()
</script>

<svelte:component this={page} />