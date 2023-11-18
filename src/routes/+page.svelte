<script lang="ts">
  import Container from '$lib/components/Container.svelte';

  const taskBoards: string[] = ['1', '2', '3', '4'];
</script>

<svelte:head>
  <title>Questa</title>
</svelte:head>

<div class="color-sunset">
  <Container class="grid grid-cols-1 gap-6 py-6 lg:grid-cols-3">
    <div class="color-fantasy rounded-xl p-6">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti blanditiis optio odit
      doloremque beatae quas consequuntur perferendis enim pariatur tenetur.
    </div>
    <div class="color-fantasy rounded-xl p-6">m2</div>
    <div class="color-fantasy rounded-xl p-6">m3</div>
  </Container>
</div>

<Container class="grow">
  <ul class="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each taskBoards as taskBoard}
      <li class="color-sunset rounded-xl p-6">
        {taskBoard}
      </li>
    {/each}

    <div>
      <button class="btn color-sunset text-flame">Добавить доску</button>
    </div>
  </ul>
</Container>
