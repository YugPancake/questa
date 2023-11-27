<script lang="ts">
  import { page } from '$app/stores';

  let message = $page.error?.message;

  switch ($page.status) {
    case 404:
      message = 'Таких страниц у нас нет';
      break;
    case 500:
      message = 'Всё сломалось...';
      break;
  }

  const kaomoji = '(╯°□°）╯︵ ┻━┻';
</script>

<svelte:head>
  <title>Ошибка...</title>
</svelte:head>

<div class="align-center m-auto flex flex-col items-center justify-center p-4">
  <h1 class="text-4xl">{$page.status}</h1>
  <p>{message}</p>
  <p class="font-sans">{kaomoji}</p>
</div>
