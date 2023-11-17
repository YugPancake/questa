<script lang="ts">
  import Container from '$lib/components/Container.svelte';

  interface TaskBoard {
    name: string;
  }

  const taskBoards: TaskBoard[] = [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }];
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
  <div class="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each taskBoards as taskBoard}
      <div class="color-sunset rounded-xl p-6">
        {taskBoard.name}
      </div>
    {/each}

    <div>
      <button class="btn color-sunset text-flame">Добавить доску</button>
    </div>
  </div>
</Container>
