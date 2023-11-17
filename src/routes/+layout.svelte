<script lang="ts">
  import '../app.css';
  import logo from '$lib/assets/img/logo.svg';

  interface NavLink {
    name: string;
    link: string;
  }

  const navLinks: NavLink[] = [
    {
      name: 'Лавка',
      link: '/shop',
    },
    {
      name: 'Инвентарь',
      link: '/inventory',
    },
    {
      name: 'Гильдия',
      link: '/guild',
    },
    {
      name: 'Календарь',
      link: '/calendar',
    },
  ];
</script>

<header class="flex items-center justify-between bg-flame px-[10%] py-3">
  <a href="/"><img alt="logo" src={logo} /></a>
  <nav class="font-mono text-white">
    <ul class="flex">
      {#each navLinks as navLink}
        <li>
          <a href={navLink.link} class="block p-4 transition-transform hover:-translate-y-1">
            {navLink.name}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</header>

<slot />
