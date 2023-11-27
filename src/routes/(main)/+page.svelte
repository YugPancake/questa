<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import CharacterSheet from '$lib/components/CharacterSheet.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  let { user } = data;

  type Task = {
    title: string;
    description: string;
    end?: Date;
    done?: boolean;
  };

  type Habit = {
    title: string;
    series: number;
  };

  type Board = {
    name: string;
    content: Task[] | Habit[];
  };

  function isHabit(pet: Habit | Task): pet is Habit {
    return (pet as Habit).series !== undefined;
  }

  const habitBoard: Board = {
    name: 'Привычки',
    content: [
      {
        title: 'Название',
        series: 0,
      },
      {
        title: 'Название',
        series: 0,
      },
    ],
  };

  const dailyBoard: Board = {
    name: 'Задачи на сегодня',
    content: [
      {
        title: 'Название',
        description: 'Описание описание',
      },
      {
        title: 'Название',
        description: 'Описание описание',
      },
    ],
  };

  const generalBoard: Board = {
    name: 'Задачи',
    content: [
      {
        title: 'Название',
        description: 'Описание описание',
        end: new Date(),
      },
    ],
  };

  const weeklyBoard: Board = {
    name: 'Задачи на неделю',
    content: [
      {
        title: 'Название',
        description: 'Описание описание',
      },
      {
        title: 'Название',
        description: 'Описание описание',
      },
      {
        title: 'Название',
        description: 'Описание описание',
      },
    ],
  };

  const boards: Board[] = [habitBoard, dailyBoard, generalBoard, weeklyBoard];
</script>

<svelte:head>
  <title>Questa</title>
</svelte:head>

<div class="color-sunset">
  <Container class="grid grid-cols-1 gap-6 py-6 lg:grid-cols-[1.15fr_1fr_0.85fr]">
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
      <p class="text-2xl">Главная задача</p>
    </div>
    <div class="color-fantasy rounded-xl p-6 lg:h-64">
      <p class="text-2xl">Помодоро таймер</p>
    </div>
  </Container>
</div>

<Container class="grow">
  <ul class="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each boards as board}
      <li class="color-sunset rounded-xl p-6">
        <div class="mb-6 flex items-center justify-between">
          <p class="text-2xl">{board.name}</p>
          <button class="btn color-fantasy text-flame">Добавить</button>
        </div>
        <ul class="flex flex-col gap-3">
          {#each board.content as object}
            <li class="color-fantasy rounded-xl p-6">
              {#if isHabit(object)}
                <p class="font-condensed text-2xl">{object.title}</p>
                <p class="font-condensed text-xl text-olive">серия: {object.series}</p>
              {:else}
                <p class="font-condensed text-2xl">{object.title}</p>
                <p class="font-condensed text-xl text-olive">{object.description}</p>
              {/if}
            </li>
          {/each}
        </ul>
      </li>
    {/each}

    <li>
      <button class="btn color-sunset text-flame">Добавить доску</button>
    </li>
  </ul>
</Container>
