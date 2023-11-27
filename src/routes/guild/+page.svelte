<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  const guidmates: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
</script>

<svelte:head>
  <title>Гильдия | Questa</title>
</svelte:head>

<div class="color-sunset">
  <Container class="grid grid-cols-1 gap-6 py-6 lg:grid-cols-3">
    <div class="color-fantasy rounded-xl p-6">
      <div class="h-[227px] w-[200px] rounded-[15px] border-2 border-stone-500"></div>
    </div>
    <ul class="grid grid-cols-2 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-6">
      {#each guidmates as guidmate}
        <li class="color-fantasy rounded-xl p-6">
          {guidmate}
        </li>
      {/each}
    </ul>
  </Container>
</div>

<Container class="grow py-[50px] ">
  <div class="text-4xl font-normal text-stone-500">Название Гильдии</div>
  <div class="text-xl font-normal">45 уровень</div>
</Container>
