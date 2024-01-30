<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import search from '$lib/assets/icons/search.svg?raw';
  import CharacterSheet from '$lib/components/CharacterSheet.svelte';
  import type { PageData } from './$types';
  import Item from '$lib/components/Item.svelte';

  export let data: PageData;

  let { user, itemTypes, usersItems } = data;

  const items = [...usersItems].map((userItem) => userItem.item);

  let filteredItems = [...items];

  const filterItemsAll = () => {
    filteredItems = [...items];
  };

  filterItemsAll();

  const filterItems = (id: number) => {
    filteredItems = items.filter((item: any) => item.itemTypeId === id);
  };

  $: searchString = '';

  $: searchedItems = filteredItems.filter((item) =>
    searchString
      ? item.name.toLowerCase().includes(searchString.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchString.toLowerCase())
      : true
  );
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
        bind:value={searchString}
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
      <ul>
        <li>
          <button class="clickable font-condensed" on:click={filterItemsAll}>Всё</button>
        </li>
        {#each itemTypes as itemType}
          <li>
            <button class="clickable font-condensed" on:click={() => filterItems(itemType.id)}>
              {itemType.name}
            </button>
          </li>
        {/each}
      </ul>
    </div>
    <div class="grow rounded-xl border-2 border-burgundy p-6">
      <ul class="flex flex-wrap gap-4">
        {#each searchedItems as item}
          <li>
            <button class="clickable">
              <Item fileName={item.fileName} name={item.name} />
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</Container>
