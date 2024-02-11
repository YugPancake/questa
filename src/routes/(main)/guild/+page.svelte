<script lang="ts">
  import CharacterSheet from '$lib/components/CharacterSheet.svelte';
  import Container from '$lib/components/Container.svelte';
  import type { PageData } from './$types';
  import { superForm } from 'sveltekit-superforms/client';
  import { chatSchema, guildSchema } from '$lib/zod/schema';
  import { invalidateAll, goto } from '$app/navigation';
  import Spinner from '$lib/components/Spinner.svelte';
  import TextInput from '$lib/components/forms/TextInput.svelte';
  import Avatar from '$lib/components/Avatar.svelte';

  export let data: PageData;

  const { user } = data;

  $: loadingId = '';
  $: editingGuild = false;
  $: joinedGuild = data.joinedGuild;
  $: guilds = data.guilds;

  let chatWindow: Element;
  let logWindow: Element;

  let guildForm = superForm(data.guildForm, {
    validators: guildSchema,
    validationMethod: 'onblur',
    taintedMessage: null,
    onUpdated: async ({ form }) => {
      if (form.valid) {
        closeGuild();
        await goto('/guild', { invalidateAll: true });
      }
    },
  });
  $: ({ form: guildSuperform } = guildForm);
  $: ({ delayed: guildDelayed, enhance: guildEnhance, errors: guildErrors } = guildForm);

  let chatForm = superForm(data.chatForm, {
    validators: chatSchema,
    validationMethod: 'onblur',
    taintedMessage: null,
    onUpdated: async ({ form }) => {
      if (form.valid) {
        await invalidateAll();
        chatWindow.scroll({ top: chatWindow.scrollHeight });
      }
    },
  });
  $: ({ form: chatSuperform } = chatForm);
  $: ({ delayed: chatDelayed, enhance: chatEnhance, errors: chatErrors } = chatForm);

  const openGuild = (guild: any) => {
    editingGuild = true;
    $guildSuperform = guild;

    loadingId = '';
  };

  const closeGuild = async () => {
    editingGuild = false;
    await invalidateAll();
  };

  const editGuild = async (event: any) => {
    const guildText = await fetch(`/api/guild/${event.target.id}`, {
      method: 'GET',
    });
    const guild = JSON.parse(await guildText.text());

    openGuild(guild);
  };

  const createGuild = async (event: any) => {
    const guildText = await fetch(`/api/guild`, {
      method: 'POST',
      body: JSON.stringify({ guildId: event.target.id }),
      headers: {
        'content-type': 'application/json',
      },
    });

    const guild = JSON.parse(await guildText.text());

    openGuild(guild);
  };

  const deleteGuild = async (event: any) => {
    await fetch(`/api/guild/${event.target.id}`, {
      method: 'DELETE',
    });

    closeGuild();
  };

  const joinGuild = async (event: any) => {
    await fetch(`/api/guild/${event.target.id}`, {
      method: 'POST',
      body: JSON.stringify({ join: true }),
      headers: {
        'content-type': 'application/json',
      },
    });

    await invalidateAll();
  };

  const leaveGuild = async (event: any) => {
    await fetch(`/api/guild/${event.target.id}`, {
      method: 'POST',
      body: JSON.stringify({ leave: true }),
      headers: {
        'content-type': 'application/json',
      },
    });

    await invalidateAll();
  };
</script>

<svelte:head>
  <title>Гильдия | Questa</title>
</svelte:head>

<div class="color-sunset">
  <Container class="grid grid-cols-1 gap-6 py-6 lg:grid-cols-[1.15fr_1.85fr]">
    <div class="color-fantasy flex gap-6 rounded-xl p-6 lg:h-64">
      <CharacterSheet {user} />
    </div>
    {#if !joinedGuild}
      <div class="flex flex-col items-center justify-center">
        <p class="text-center">
          Вы не состоите в гильдии. Присоединитесь к гильдии из списка ниже или
        </p>
        <button
          class="btn color-flame"
          on:click={(event) => {
            loadingId = 'sss';
            createGuild(event);
          }}
          >Создайте свою гильдию{#if loadingId === 'sss'}<Spinner />{/if}</button
        >
      </div>
    {:else}
      <div class="h-64 overflow-y-auto">
        <ul class="flex flex-wrap items-center justify-center gap-6">
          {#each joinedGuild.users as guildMate}
            <li
              class="color-fantasy flex aspect-square h-32 w-32 flex-col items-center rounded-xl p-2"
            >
              <Avatar
                avatar={{
                  body: guildMate.stats?.avatarBody.fileName,
                  eyes: guildMate.stats?.avatarEyes.fileName,
                  outfit: guildMate.stats?.avatarOutfit.fileName,
                }}
                class="h-full"
              />
              <div class="text-ellipsis">
                {guildMate.name}
              </div>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </Container>
</div>

<Container class="flex grow flex-col gap-6 py-6 lg:flex-row">
  {#if !joinedGuild}
    <ul class="flex grow flex-col items-stretch">
      {#each guilds as guild}
        <li class="color-sunset rounded-xl p-4">
          <button
            class="clickable flex w-full flex-col items-start"
            id={guild.id}
            on:click={(event) => {
              loadingId = guild?.id + 'a';
              joinGuild(event);
            }}
          >
            <div class="text-2xl text-flame" id={guild.id}>
              {guild.name}
            </div>
            <div id={guild.id}>
              Участников: {guild.users.length} | Уровень: {guild.level}
            </div>
          </button>
        </li>
      {/each}
    </ul>
  {:else}
    <div class="grow">
      {#if joinedGuild.leaderId === user.id}
        <button
          class="clickable text-4xl text-olive"
          id={joinedGuild.id}
          on:click={(event) => {
            loadingId = joinedGuild?.id + 'a';
            editGuild(event);
          }}
        >
          {joinedGuild.name}{#if loadingId === joinedGuild?.id + 'a'}<Spinner />{/if}
        </button>
      {:else}
        <p class="text-4xl text-olive">{joinedGuild.name}</p>
      {/if}
      <p class="text-xl">{joinedGuild.level} уровень</p>
      <button
        class="btn color-flame"
        id={joinedGuild.id}
        on:click={(event) => {
          loadingId = 'leave';
          leaveGuild(event);
        }}
        >Покинуть гильдию{#if loadingId === 'leave'}<Spinner />{/if}</button
      >
      <div class="mt-4 h-auto rounded-2xl bg-sunset p-6">
        <p class="text-xl">Недельный Босс:</p>
        <p class="text-2xl">Имя Босса</p>
        <div class="flex flex-col gap-6 sm:flex-row">
          <div class="aspect-square max-h-32 grow rounded-2xl bg-fantasy"></div>
          <div class="flex max-w-screen-sm grow flex-col">
            <p class="text-xl text-flame">Лог сражения:</p>
            <div
              class="h-[20rem] grow overflow-y-auto rounded-2xl bg-fantasy"
              bind:this={logWindow}
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex max-w-screen-sm grow flex-col gap-3 rounded-2xl bg-sunset p-6">
      <div class="h-[20rem] grow overflow-y-auto rounded-2xl bg-fantasy p-3" bind:this={chatWindow}>
        <ul class="flex flex-col gap-3">
          {#each joinedGuild.messages as message}
            <li>
              <div class="flex justify-between">
                <p class="text-flame">{message.user.name}</p>
                <p class="font-condensed text-sand">
                  {`${message.createdAt.toLocaleDateString(
                    'ru-RU'
                  )} ${message.createdAt.toLocaleTimeString('ru-RU')}`}
                </p>
              </div>
              <p class="font-condensed">
                {message.text}
              </p>
            </li>
          {/each}
        </ul>
      </div>
      <form
        action="?/sendMessage"
        method="POST"
        class="flex items-start justify-stretch gap-3"
        use:chatEnhance
      >
        <input type="hidden" name="guildId" value={joinedGuild.id} />
        <TextInput field="message" form={chatForm} />
        <button type="submit" class="btn color-olive aspect-square p-5"
          >{#if $chatDelayed}<Spinner />{:else}>{/if}</button
        >
      </form>
    </div>
  {/if}
</Container>

{#if editingGuild}
  <div class="fixed flex h-full w-full items-center justify-center bg-black/50">
    <div
      class="color-fantasy flex max-h-screen w-full max-w-lg flex-col items-center space-y-8 overflow-y-auto rounded-2xl p-12"
    >
      <form action="?/saveGuild" method="POST" class="w-full lg:w-96" use:guildEnhance>
        <input type="hidden" name="id" bind:value={$guildSuperform.id} />
        <TextInput field="name" label="Название гильдии" form={guildForm} />
        <div class="min-h-[1.5rem] font-condensed text-flame">
          {#if $guildErrors?._errors}{$guildErrors?._errors.join('; ')}{/if}
        </div>
        <div class="flex flex-col gap-4">
          <button class="btn color-olive h-16 w-full" type="submit">
            Сохранить{#if $guildDelayed}<Spinner />{/if}
          </button>
          <div class="flex justify-end gap-4">
            <button
              class="btn color-flame h-16 w-full"
              type="button"
              id={$guildSuperform.id}
              on:click={(event) => {
                loadingId = 'deleteb';
                deleteGuild(event);
              }}
            >
              Удалить{#if loadingId === 'deleteb'}<Spinner />{/if}
            </button>
            <button class="btn color-sand h-16 w-full" type="button" on:click={closeGuild}>
              Отмена
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
{/if}
