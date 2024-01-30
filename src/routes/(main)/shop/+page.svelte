<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import search from '$lib/assets/icons/search.svg?raw';
  import type { PageData } from './$types';
  import Avatar from '$lib/components/Avatar.svelte';
  import Item from '$lib/components/Item.svelte';
  import ShopOwnerImg from '$lib/assets/images/shop_owner.png';
  import { superForm } from 'sveltekit-superforms/client';
  import { itemBuySchema } from '$lib/zod/schema';
  import { invalidateAll } from '$app/navigation';
  import Spinner from '$lib/components/Spinner.svelte';
  import coin from '$lib/assets/icons/coin.svg?raw';

  export let data: PageData;

  let { user, itemTypes, items } = data;

  let filteredItems = [...items];

  const featuredItems = [...items].sort(() => 0.5 - Math.random()).slice(0, 3);

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

  let buyingItem = false;
  let selectedItem: any;

  let itemBuyForm = superForm(data.itemBuyForm, {
    validators: itemBuySchema,
    validationMethod: 'onblur',
    taintedMessage: null,
    onUpdated: ({ form }) => {
      if (form.valid) buyingItem = false;
    },
  });
  $: ({ form: itemBuySuperform } = itemBuyForm);
  $: ({ delayed: itemBuyDelayed, enhance: itemBuyEnhance, errors: itemBuyErrors } = itemBuyForm);

  $: loadingId = '';

  const openItemBuy = (item: any) => {
    buyingItem = true;
    $itemBuySuperform = item;
    selectedItem = item;

    loadingId = '';
  };

  const closeItemBuy = async () => {
    buyingItem = false;
    await invalidateAll();
  };
</script>

<svelte:head>
  <title>Лавка | Questa</title>
</svelte:head>

<div class="color-sunset">
  <Container class="flex flex-col justify-between gap-6 py-6 lg:flex-row">
    <div class="color-fantasy flex flex-col items-center justify-center rounded-xl p-6 lg:flex-row">
      <img src={ShopOwnerImg} alt="Торговец" class="w-auto sm:h-52" width="1000" height="566" />
      <ul class="flex flex-col gap-4 sm:flex-row">
        {#each featuredItems as item}
          <li>
            <button
              class="clickable"
              on:click={() => {
                loadingId = item.id + 'a';
                openItemBuy(item);
              }}
            >
              <Item fileName={item.fileName} name={item.name} cost={item.cost} />
            </button>
          </li>
        {/each}
      </ul>
    </div>

    <div class="color-fantasy hidden rounded-xl p-6 lg:block">
      <Avatar
        avatar={{
          body: user.stats?.avatarBody.fileName,
          eyes: user.stats?.avatarEyes.fileName,
          outfit: user.stats?.avatarOutfit.fileName,
        }}
        class="h-60"
      />
    </div>
  </Container>
</div>

<Container class="flex grow flex-col gap-6 py-6">
  <form class="flex justify-end">
    <div class="flex w-full max-w-sm">
      <input
        type="String"
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
            <button
              class="clickable"
              on:click={() => {
                loadingId = item.id + 'a';
                openItemBuy(item);
              }}
            >
              <Item fileName={item.fileName} name={item.name} cost={item.cost} />
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</Container>

{#if buyingItem}
  <div class="fixed flex h-full w-full items-center justify-center bg-black/50">
    <div
      class="color-fantasy flex max-h-screen w-full max-w-lg flex-col items-center space-y-8 overflow-y-auto rounded-2xl p-12 md:max-w-xl"
    >
      <form action="?/buyItem" method="POST" class="w-full" use:itemBuyEnhance>
        <input type="hidden" name="id" bind:value={$itemBuySuperform.id} />
        <div class="flex flex-col gap-4">
          <p>{selectedItem.name}</p>
          <div><img src="/sprites/items/{selectedItem.fileName}" alt="" /></div>
          <p class="font-condensed">{selectedItem.description}</p>
          <p class="flex items-center">Стоимость: <span>{@html coin}</span>{selectedItem.cost}</p>
        </div>
        <div class="min-h-[1.5rem] font-condensed text-flame">
          {#if $itemBuyErrors?._errors}{$itemBuyErrors?._errors.join('; ')}{/if}
        </div>
        <div class="flex w-full justify-center gap-4">
          <button class="btn color-olive h-16" type="submit">
            Купить{#if $itemBuyDelayed}<Spinner />{/if}
          </button>
          <button class="btn color-sand h-16" type="button" on:click={closeItemBuy}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
