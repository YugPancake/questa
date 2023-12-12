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
    '13',
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

<Container class="grow py-[50px] ">
  <p class="text-4xl text-olive">Название Гильдии</p>
  <p class="text-xl">45 уровень</p>
</Container>
