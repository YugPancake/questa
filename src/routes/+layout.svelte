<script lang="ts">
  import '../app.css';
  import '@fontsource/press-start-2p';
  import type { PageData } from './$types';
  import logo from '$lib/assets/images/logo.svg?raw';
  import Container from '$lib/components/Container.svelte';

  export let data: PageData;



  type NavLink = {
    name: string;
    link: string;
  };

  const navLinks: NavLink[] = [
    {
      name: 'Квесты',
      link: '/',
    },
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
    {
      name: 'ТЕСТОВОЕ',
      link: '/test',
    },
  ];

  const navLinksUnauthorized: NavLink[] = [
    {
      name: 'Вход',
      link: '/login',
    },
    {
      name: 'Регистрация',
      link: '/signup',
    },
  ];
</script>

<div class="color-fantasy flex h-full min-h-screen flex-col justify-between break-words font-mono">
  <header class="color-flame">
    <Container class="flex flex-col items-center justify-between py-3 xl:flex-row">
      <a href="/" aria-label="QUESTA" class="clickable block">
        {@html logo}
      </a>
      {#if !data.session?.user}
        <nav>
          <ul class="flex flex-wrap justify-around">
            {#each navLinksUnauthorized as navLink}
              <li>
                <a href={navLink.link} class="clickable block px-4 py-2">
                  {navLink.name}
                </a>
              </li>
            {/each}
          </ul>
        </nav>
      {:else}
        <nav>
          <ul class="flex flex-wrap justify-around">
            {#each navLinks as navLink}
              <li>
                <a href={navLink.link} class="clickable block px-4 py-2">
                  {navLink.name}
                </a>
              </li>
            {/each}
          </ul>
        </nav>
      {/if}
    </Container>
  </header>
  <slot />

  <footer class="color-olive p-4 font-condensed text-xl">
    <p class="flex items-center justify-center">by Qteam</p>
  </footer>
</div>
