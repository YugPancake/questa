<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import search from '$lib/assets/icons/search.svg?raw';
  import type { PageData } from './$types';
  import Avatar from '$lib/components/Avatar.svelte';
  import ShopOwnerImg from '$lib/assets/images/shop_owner.png';

  export let data: PageData;

  let { user } = data;
</script>

<svelte:head>
  <title>Лавка | Questa</title>
</svelte:head>

<div class="color-sunset">
  <Container class="flex flex-col justify-between gap-6 py-6 lg:flex-row">
    <div class="color-fantasy flex flex-col items-center justify-center rounded-xl p-6 lg:flex-row">
      <img src={ShopOwnerImg} alt="Торговец" class="sm:h-52 w-auto" width="1000" height="566" />
      <div class="flex flex-col gap-4 sm:flex-row">
        <div class="h-36 w-36 rounded-xl border-2 border-olive object-cover"></div>
        <div class="h-36 w-36 rounded-xl border-2 border-olive object-cover"></div>
        <div class="h-36 w-36 rounded-xl border-2 border-olive object-cover"></div>
      </div>
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
      <div class="grid grid-cols-5 grid-rows-3 px-8">
        <div class="mx-8 my-12 h-36 w-36 rounded-xl border-4 border-olive object-cover"></div>
      </div>
    </div>
  </div>
</Container>
