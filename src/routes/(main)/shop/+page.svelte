<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import search from '$lib/assets/icons/search.svg?raw';
  import type { PageData } from './$types';

  export let data: PageData;

  let { user } = data;
</script>

<svelte:head>
  <title>Лавка | Questa</title>
</svelte:head>

<div class="color-sunset">
  <Container class="flex flex-col gap-6 py-6 lg:flex-row">
    <div class="color-fantasy rounded-xl flex items-center justify-center  mr-28">
      <img src="src\lib\assets\images\shop_owner.png" alt="Торговец" class="h-60">
      <div class="w-36 h-36 rounded-xl border-4 border-olive object-cover ml-9 mr-9" ></div>
      <div class="w-36 h-36 rounded-xl border-4 border-olive object-cover ml-9 mr-9" ></div>
      <div class="w-36 h-36 rounded-xl border-4 border-olive object-cover ml-9 mr-20" ></div>
    </div>
    
    <div class="color-fantasy rounded-xl p-6 lg:h-64">
      <img
        alt={user.stats?.avatar.alt}
        src="/avatars/{user.stats?.avatar.fileName}"
        class="aspect-square h-full rounded-xl border-2 border-olive object-cover"
      />
    </div>
  </Container>
</div>

<Container class="flex grow flex-col gap-6 py-6">
  <form class="flex justify-end">
    <div class="flex w-full max-w-sm">
      <input
        type="search"
        id="search"
        class="input rounded-r-none border-r-0"
        placeholder="Поиск..."
      />
      <dir
        class="input my-0 flex w-fit items-center justify-center rounded-l-none border-l-0 p-0 text-flame"
      >
        <button type="submit" class="clickable p-3">
          {@html search}
        </button>
      </dir>
    </div>
  </form>
  <div class="flex grow flex-col items-stretch gap-6 md:flex-row">
    <div class="rounded-xl border-2 border-burgundy p-6">
      <p>Фильтрация</p>
    </div>
    <div class="grow rounded-xl border-2 border-burgundy p-6">
      <p>Предметы</p>
    </div>
  </div>
</Container>
