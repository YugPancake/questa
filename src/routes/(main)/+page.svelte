<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import CharacterSheet from '$lib/components/CharacterSheet.svelte';
  import type { PageData } from './$types';
  import { boardSchema, taskSchema } from '$lib/zod/schema';
  import { superForm } from 'sveltekit-superforms/client';
  import TextInput from '$lib/components/forms/TextInput.svelte';
  import DateTimeInput from '$lib/components/forms/DateTimeInput.svelte';
  import CheckboxInput from '$lib/components/forms/CheckboxInput.svelte';
  import DropdownInput from '$lib/components/forms/DropdownInput.svelte';
  import Timer from '$lib/components/Timer.svelte';
  import Spinner from '$lib/components/Spinner.svelte';
  import { invalidateAll } from '$app/navigation';

  export let data: PageData;

  let { priorityLevels } = data;
  $: ({ boards, user } = data);

  $: editingTask = false;
  $: editingBoard = false;

  let taskForm = superForm(data.taskForm, {
    validators: taskSchema,
    validationMethod: 'onblur',
    taintedMessage: null,
    onUpdated: ({ form }) => {
      if (form.valid) editingTask = false;
    },
  });
  $: ({ form: taskSuperform } = taskForm);
  $: ({ delayed: taskDelayed, enhance: taskEnhance, errors: taskErrors } = taskForm);

  let boardForm = superForm(data.boardForm, {
    validators: boardSchema,
    validationMethod: 'onblur',
    taintedMessage: null,
    onUpdated: ({ form }) => {
      if (form.valid) editingBoard = false;
    },
  });
  $: ({ form: boardSuperform } = boardForm);
  $: ({ delayed: boardDelayed, enhance: boardEnhance, errors: boardErrors } = boardForm);

  $: durationEnabled = taskForm.fields.durationEnabled.value;
  $: loadingId = '';

  const priorityLevelColors = ['bg-olive', 'bg-sand', 'bg-flame'];

  const openBoard = (board: any) => {
    editingBoard = true;
    $boardSuperform = board;

    loadingId = '';
  };

  const closeBoard = async () => {
    editingBoard = false;
    await invalidateAll();
  };

  const editBoard = async (event: any) => {
    const boardText = await fetch(`/board/${event.target.id}`, {
      method: 'GET',
    });
    const board = JSON.parse(await boardText.text());

    openBoard(board);
  };

  const createBoard = async (event: any) => {
    const boardText = await fetch(`/board`, {
      method: 'POST',
      body: JSON.stringify({ boardId: event.target.id }),
      headers: {
        'content-type': 'application/json',
      },
    });

    const board = JSON.parse(await boardText.text());

    openBoard(board);
  };

  const deleteBoard = async (event: any) => {
    await fetch(`/board/${event.target.id}`, {
      method: 'DELETE',
    });

    closeBoard();
  };

  const openTask = (task: any) => {
    editingTask = true;

    task.start = task.start?.split('T')[0];
    task.end = task.end?.split('T')[0];
    console.log(task);

    $taskSuperform = task;

    loadingId = '';
  };

  const closeTask = async () => {
    editingTask = false;
    await invalidateAll();
  };

  const editTask = async (event: any) => {
    const taskText = await fetch(`/task/${event.target.id}`, {
      method: 'GET',
    });
    const task = JSON.parse(await taskText.text());

    openTask(task);
  };

  const checkTask = async (event: any) => {
    await fetch(`/task/${event.target.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ value: event.target.checked }),
      headers: {
        'content-type': 'application/json',
      },
    });

    loadingId = '';
    await invalidateAll();
  };

  const createTask = async (event: any) => {
    const taskText = await fetch(`/task`, {
      method: 'POST',
      body: JSON.stringify({ boardId: event.target.id }),
      headers: {
        'content-type': 'application/json',
      },
    });

    const task = JSON.parse(await taskText.text());

    openTask(task);
  };

  const deleteTask = async (event: any) => {
    await fetch(`/task/${event.target.id}`, {
      method: 'DELETE',
    });

    closeTask();
  };
</script>

<svelte:head>
  <title>Questa</title>
</svelte:head>

<div class="color-sunset">
  <Container class="grid grid-cols-1 gap-6 py-6 lg:grid-cols-[1.15fr_1fr_0.85fr]">
    <div class="color-fantasy flex gap-6 rounded-xl p-6 lg:h-64">
      <CharacterSheet {user} />
    </div>
    <div class="color-fantasy rounded-xl p-6 lg:h-64">
      <p class="text-2xl">Главная задача</p>
    </div>
    <div class="color-fantasy flex flex-col gap-4 rounded-xl p-6 lg:h-64">
      <p class="text-2xl">Помодоро таймер</p>
      <Timer />
    </div>
  </Container>
</div>

<Container class="grow">
  <ul class="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each boards as board}
      <li class="color-sunset rounded-xl p-6">
        <div class="mb-3 flex items-start justify-between">
          <button
            class="clickable block h-full w-full text-left text-2xl"
            id={board.id}
            on:click={(event) => {
              loadingId = board.id + 'a';
              editBoard(event);
            }}
          >
            {board.name}{#if loadingId === board.id + 'a'}<Spinner />{/if}
          </button>
          <button
            class="btn color-fantasy text-flame"
            id={board.id}
            on:click={(event) => {
              loadingId = board.id;
              createTask(event);
            }}
            >{#if loadingId === board.id}<Spinner />{:else}<svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-plus"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                id={board.id}
                ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path
                  d="M5 12l14 0"
                /></svg
              >{/if}</button
          >
        </div>
        <ul class="flex flex-col gap-3">
          {#each board.tasks as task}
            <li class="color-fantasy flex gap-4 rounded-xl p-4">
              <input
                type="checkbox"
                checked={task.done}
                on:click={(event) => {
                  loadingId = task.id;
                  checkTask(event);
                }}
                id={task.id}
                class="clickable h-12 w-12 rounded-xl border-2 border-olive bg-fantasy p-3 text-xl text-flame outline-none focus:ring-0 focus-visible:border-olive focus-visible:outline-dashed focus-visible:outline-olive"
              />
              <button
                class="clickable block grow self-stretch text-left"
                id={task.id}
                on:click={(event) => {
                  loadingId = task.id;
                  editTask(event);
                }}
              >
                <div class="flex items-start" id={task.id}>
                  <p class="grow font-condensed text-2xl" id={task.id}>
                    {task.title}
                    {#if loadingId === task.id}<Spinner />{/if}
                  </p>
                </div>
                {#if task.priority}
                  <div class="flex items-center" id={task.id}>
                    <p class="font-condensed text-xl text-olive" id={task.id}>
                      {task.priority.name}
                    </p>
                    <div
                      class="h-4 w-4 rounded-full {priorityLevelColors[task.priority.id - 1]}"
                      id={task.id}
                    ></div>
                  </div>
                {/if}
                {#if task.description}
                  <p class="font-condensed text-xl text-olive" id={task.id}>
                    {task.description}
                  </p>
                {/if}
                {#if task.durationEnabled}
                  <p class="font-condensed text-xl text-olive" id={task.id}>
                    {task.start?.toLocaleDateString('ru-RU')} - {task.end?.toLocaleDateString(
                      'ru-RU'
                    )}
                  </p>
                {/if}
              </button>
            </li>
          {/each}
        </ul>
      </li>
    {/each}

    <li>
      <button
        class="btn color-sunset text-flame"
        on:click={(event) => {
          loadingId = 'sss';
          createBoard(event);
        }}
        >Добавить доску{#if loadingId === 'sss'}<Spinner />{/if}</button
      >
    </li>
  </ul>
</Container>

{#if editingTask}
  <div class="fixed flex h-full w-full items-center justify-center bg-black/50">
    <div
      class="color-fantasy flex max-h-screen w-full max-w-lg flex-col items-center space-y-8 overflow-y-auto rounded-2xl p-12 md:max-w-4xl"
    >
      <form action="?/saveTask" method="POST" class="w-full" use:taskEnhance>
        <input type="hidden" name="id" bind:value={$taskSuperform.id} />
        <div class="flex flex-col gap-4 md:flex-row">
          <div class="md:w-1/2">
            <TextInput field="title" label="Название" form={taskForm} />
            <TextInput field="description" label="Описание" form={taskForm} />
            <DropdownInput
              field="boardId"
              label="Доска"
              form={taskForm}
              options={boards.map((board) => {
                return { name: board.name, value: board.id };
              })}
            />
          </div>
          <div class="md:w-1/2">
            <CheckboxInput field="durationEnabled" label="Срок" form={taskForm} />
            <DateTimeInput
              field="start"
              label="Начало"
              form={taskForm}
              disabled={!$durationEnabled}
            />
            <DateTimeInput field="end" label="Конец" form={taskForm} disabled={!$durationEnabled} />
            <DropdownInput
              field="priorityLevelId"
              label="Приоритет"
              form={taskForm}
              options={[{ name: 'Нет', id: null }, ...priorityLevels].map((priorityLevel) => {
                return { name: priorityLevel.name, value: priorityLevel.id };
              })}
            />
          </div>
        </div>
        <div class="min-h-[1.5rem] font-condensed text-flame">
          {#if $taskErrors?._errors}{$taskErrors?._errors.join('; ')}{/if}
        </div>
        <div class="flex w-full justify-center">
          <div class="flex flex-col gap-4 lg:w-96">
            <button class="btn color-olive h-16" type="submit">
              Сохранить{#if $taskDelayed}<Spinner />{/if}
            </button>
            <div class="flex justify-stretch gap-4">
              <button
                class="btn color-flame h-16 w-full"
                type="button"
                id={$taskSuperform.id}
                on:click={(event) => {
                  loadingId = 'delete';
                  deleteTask(event);
                }}
              >
                Удалить{#if loadingId === 'delete'}<Spinner />{/if}
              </button>
              <button class="btn color-sand h-16 w-full" type="button" on:click={closeTask}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
{/if}

{#if editingBoard}
  <div class="fixed flex h-full w-full items-center justify-center bg-black/50">
    <div
      class="color-fantasy flex max-h-screen w-full max-w-lg flex-col items-center space-y-8 overflow-y-auto rounded-2xl p-12"
    >
      <form action="?/saveBoard" method="POST" class="w-full lg:w-96" use:boardEnhance>
        <input type="hidden" name="id" bind:value={$boardSuperform.id} />
        <TextInput field="name" label="Новая доска" form={boardForm} />
        <div class="min-h-[1.5rem] font-condensed text-flame">
          {#if $boardErrors?._errors}{$boardErrors?._errors.join('; ')}{/if}
        </div>
        <div class="flex flex-col gap-4">
          <button class="btn color-olive h-16 w-full" type="submit">
            Сохранить{#if $boardDelayed}<Spinner />{/if}
          </button>
          <div class="flex justify-end gap-4">
            <button
              class="btn color-flame h-16 w-full"
              type="button"
              id={$boardSuperform.id}
              on:click={(event) => {
                loadingId = 'deleteb';
                deleteBoard(event);
              }}
            >
              Удалить{#if loadingId === 'deleteb'}<Spinner />{/if}
            </button>
            <button class="btn color-sand h-16 w-full" type="button" on:click={closeBoard}>
              Отмена
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
{/if}
