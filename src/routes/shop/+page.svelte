<script lang="ts">
  import Container from '$lib/components/Container.svelte';
</script>

<svelte:head>
  <title>Лавка | Questa</title>
</svelte:head>

<div class="color-sunset">
  <Container class="grid grid-cols-1 gap-6 py-6 lg:grid-cols-2">
    <div class="color-fantasy rounded-xl p-6">Торговец</div>
    <div class="color-fantasy rounded-xl p-6">Персонаж</div>
  </Container>
</div>

<Container class="grow">
  <div
    class="relative top-[12px] ml-auto h-[49px] w-[350px] rounded-[50px] border-2 border-red-900"
  ></div>
  <Container class="grid grid-cols-1 gap-6 py-6 lg:grid-cols-2">
    <div class="relative top-[12px] rounded-[25px] border-2 border-red-900 p-6">Фильтрация</div>
    <div class="relative top-[12px] rounded-[25px] border-2 border-red-900 p-6">Товары</div>
  </Container>
</Container>
