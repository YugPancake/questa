<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import search from '$lib/assets/icons/search.svg?raw';
  import CharacterSheet from '$lib/components/CharacterSheet.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  let { user } = data;
</script>

<svelte:head>
  <title>Инвентарь | Questa</title>
</svelte:head>

<div class="color-sunset">
  <Container class="grid grid-cols-1 gap-6 py-6 lg:grid-cols-[1.15fr_1.85fr]">
    <div class="color-fantasy flex gap-6 rounded-xl p-6 lg:h-64">
      <CharacterSheet {user} />
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
      <div class="px-8 grid grid-cols-5 grid-rows-3">
        <div class="w-36 h-36 rounded-xl border-4 border-olive object-cover mx-8 my-12" ></div>
      </div>
    </div>
  </div>
</Container>

