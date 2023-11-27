<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ testRecords } = data);
</script>

<svelte:head>
  <title>Тестовая страница</title>
</svelte:head>

<Container class="flex justify-center gap-6">
  <form action="?/createTestRecord" method="post" class="w-96">
    <h3>Новая запись</h3>
    <label for="title">
      <span>Заголовок</span>
      <input type="text" id="title" name="title" class="input" />
    </label>
    <label for="content">
      <span>Содержимое</span>
      <textarea name="content" id="content" cols="30" rows="3" class="input"></textarea>
    </label>
    <button type="submit" class="btn color-flame">Создать</button>
  </form>
  <ul class="flex flex-col gap-2">
    {#each testRecords as record}
      <li class="color-sunset rounded-xl p-2">
        <h3>{record.title}</h3>
        <p>{record.content}</p>
        <form action="?/updateTestRecord&id={record.id}" method="post">
          <input name="content" id="content" class="input w-64" />
          <button type="submit" class="btn color-olive">Изменить</button>
        </form>
        <form action="?/deleteTestRecord&id={record.id}" method="post">
          <button type="submit" class="btn color-flame">Удалить</button>
        </form>
      </li>
    {/each}
  </ul>
  <form action="/logout" method="post">
    <button type="submit" class="btn color-flame">Выйти</button>
  </form>
</Container>
