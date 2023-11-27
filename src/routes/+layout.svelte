<script lang="ts">
  import '../app.css';
  import '@fontsource/press-start-2p';
  import logo from '$lib/assets/images/logo.svg?raw';
  import Container from '$lib/components/Container.svelte';

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
  ];
</script>

<div class="color-fantasy flex h-full min-h-screen flex-col justify-between break-words font-mono">
  <header class="color-flame">
    <Container class="flex flex-col items-center justify-between py-3 xl:flex-row">
      <a href="/" aria-label="Главная" class="clickable block"><img alt="Questa" src={logo} /></a>
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
    </Container>
  </header>
  <slot />

  <footer class="color-olive p-4">
    <p class="flex items-center justify-center">by Qteam</p>
  </footer>
</div>
