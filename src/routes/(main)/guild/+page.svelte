<script lang="ts">
  import CharacterSheet from '$lib/components/CharacterSheet.svelte';
  import Container from '$lib/components/Container.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const { user } = data;

  const guildMates: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
</script>

<svelte:head>
  <title>Гильдия | Questa</title>
</svelte:head>

<div class="color-sunset">
  <Container class="grid grid-cols-1 gap-6 py-6 lg:grid-cols-[1.15fr_1.85fr]">
    <div class="color-fantasy flex gap-6 rounded-xl p-6 lg:h-64">
      <CharacterSheet {user} />
    </div>
    <div class="h-64 overflow-y-auto">
      <ul class="flex flex-wrap items-center justify-center gap-6">
        {#each guildMates as guildMate}
          <li class="color-fantasy aspect-square w-28 rounded-xl p-6">
            {guildMate}
          </li>
        {/each}
      </ul>
    </div>
  </Container>
</div>

<Container class="grow py-12 grid grid-cols-2 gap-32 lg:grid-cols-[1.35fr_0.65fr]">
  <div>
    <p class="text-4xl text-olive">Название Гильдии</p>
    <p class="text-xl pb-7">45 уровень</p>
    <div class="h-auto bg-sunset rounded-2xl py-11 px-16">
      <p class=" text-2xl pb-10">Недельный Босс: Имя Босса</p>
      <div class="grid grid-cols-2 gap-9">
        <div class="bg-fantasy h-[600px] rounded-2xl "></div>
        <div class="">
          <p class="text-flame text-xl pb-5  text-center">Лог сражения:</p>
          <div class="bg-fantasy rounded-2xl h-[552px]"></div>
        </div>
      </div>
    </div>
</div>

<div class="bg-sunset rounded-2xl h-auto p-10 grid lg:grid-rows-[1.8fr_0.2fr]">
  <div class="bg-fantasy rounded-2xl h-full"></div>
  <div class="bg-fantasy rounded-2xl h-20 mt-6"></div>
</div>
  
</Container>
