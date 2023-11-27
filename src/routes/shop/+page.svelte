<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import Quefir from '$lib/assets/images/quefir.png';
</script>

<svelte:head>
  <title>Лавка | Questa</title>
</svelte:head>

<div class="color-sunset">
  <Container class="flex flex-col gap-6 py-6 lg:flex-row">
    <div class="color-fantasy grow rounded-xl p-6 lg:h-64">Торговец</div>
    <div class="color-fantasy rounded-xl p-6 lg:h-64">
      <img
        alt="Аватар"
        src={Quefir}
        class="aspect-square h-full rounded-xl border-2 border-olive object-cover"
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
      <button type="submit" class="input w-fit rounded-l-none border-l-0">0</button>
    </div>
  </form>
  <div class="flex grow flex-col items-stretch gap-6 md:flex-row">
    <div class="rounded-xl border-2 border-burgundy p-6">
      <p>Фильтрация</p>
    </div>
    <div class="grow rounded-xl border-2 border-burgundy p-6">
      <p>Предметы</p>
    </div>
  </div>
</Container>
