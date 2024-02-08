<script lang="ts">
  import '../app.css';
  import '@fontsource/press-start-2p';
  import { clickOutside } from '$lib/utils/clickOutside';
  import type { PageData } from './$types';
  import logo from '$lib/assets/images/logo.svg?raw';
  import bell from '$lib/assets/icons/bell.svg?raw';
  import coin from '$lib/assets/icons/coin.svg?raw';
  import user from '$lib/assets/icons/user.svg?raw';
  import Container from '$lib/components/Container.svelte';

  export let data: PageData;

  $: ({ stats } = data);

  let profileOpen = false;

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
    // {
    //   name: 'ТЕСТОВОЕ',
    //   link: '/test',
    // },
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
        <div class="flex items-center justify-around text-fantasy">
          <a href="/" aria-label="Монеты" class="clickable flex items-center gap-2 p-2">
            <span>{@html coin}</span>{stats?.coins ?? 0}
          </a>
          <div class="relative">
            <button aria-label="Уведомления" class="clickable block p-2">
              {@html bell}
            </button>
          </div>
          <div class="relative">
            <button
              aria-label="Профиль"
              class="clickable block p-2"
              on:click={() => (profileOpen = !profileOpen)}
            >
              {@html user}
            </button>
            {#if profileOpen}
              <div
                class="color-fantasy absolute right-0 z-10 space-y-4 rounded-xl border-2 border-olive p-6"
                use:clickOutside
                on:click_outside={() => (profileOpen = false)}
              >
                <div>
                  <p class="text-xl">{data.session.user.name}</p>
                </div>
                <form action="/logout" method="post">
                  <button type="submit" class="btn color-flame">Выйти</button>
                </form>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </Container>
  </header>
  <slot />

  <footer class="color-olive p-4 font-condensed text-xl">
    <p class="flex items-center justify-center">
      <a href="/about" class="clickable">by Qteam</a>
    </p>
  </footer>
</div>
