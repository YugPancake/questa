<script>
	import '../app.css';
	import logo from '$lib/assets/img/logo.svg';
</script>

<header>
	<a href="/"><img alt="logo" src={logo} /></a>
	<nav>
		<a href="/shop" class="link">Лавка</a>
		<a href="/inventory" class="link">Инвентарь</a>
		<a href="/guild" class="link">Гильдия</a>
		<a href="/calendar" class="link">Календарь</a>
	</nav>
</header>

<slot />
