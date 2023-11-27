<script lang="ts">
  import CharacterSheet from '$lib/components/CharacterSheet.svelte';
  import Container from '$lib/components/Container.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const { user } = data;
</script>

<svelte:head>
  <title>Инвентарь | Questa</title>
</svelte:head>

<div class="color-sunset">
  <Container class="grid grid-cols-1 gap-6 py-6 lg:grid-cols-[1.15fr_1.85fr]">
    <div class="color-fantasy flex gap-6 rounded-xl p-6 lg:h-64">
      <CharacterSheet
        name={user.name}
        characterClass={'Почтальон'}
        level={56}
        healthMax={100}
        healthValue={90}
        experienceMax={250}
        experienceValue={50}
      />
    </div>
    <div class="color-fantasy rounded-xl p-6 lg:h-64">
      <p class="text-2xl">Инвентарь</p>
    </div>
  </Container>
</div>

<Container class="grow"></Container>
