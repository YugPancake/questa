<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import type { PageData } from './$types';
  import { superForm } from 'sveltekit-superforms/client';
  import { createCharacterSchema } from '$lib/zod/schema';
  import Spinner from '$lib/components/Spinner.svelte';

  export let data: PageData;

  const { form, errors, constraints, enhance, delayed } = superForm(data.form, {
    validators: createCharacterSchema,
    validationMethod: 'onblur',
    taintedMessage: null,
  });

  const { classes, avatars } = data;
</script>

<svelte:head>
  <title>Создание персонажа | Questa</title>
</svelte:head>

<Container class="flex items-center justify-center">
  <form method="post" class="w-96" use:enhance>
    <h3>Создание персонажа</h3>
    <fieldset>
      <legend>Выберите аватар</legend>
      <div class="flex">
        {#each avatars as avatar}
          <label for="avatar-{avatar.id}">
            <input
              type="radio"
              id="avatar-{avatar.id}"
              name="avatar"
              value={avatar.id}
              bind:group={$form.avatar}
            />
            <img src="/avatars/{avatar.fileName}" alt={avatar.alt} class="h-24" />
          </label>
        {/each}
      </div>
      <div class="min-h-[1.5rem] font-condensed text-flame">
        {#if $errors.characterClass}{$errors.characterClass.join('; ')}{/if}
      </div>
    </fieldset>
    <fieldset>
      <legend>Выберите класс</legend>
      <div class="flex flex-col">
        {#each classes as characterClass}
          <label for="characterClass-{characterClass.id}">
            <input
              type="radio"
              id="characterClass-{characterClass.id}"
              name="characterClass"
              value={characterClass.id}
              bind:group={$form.characterClass}
            />
            <span>{characterClass.name}</span>
          </label>
        {/each}
      </div>
      <div class="min-h-[1.5rem] font-condensed text-flame">
        {#if $errors.characterClass}{$errors.characterClass.join('; ')}{/if}
      </div>
    </fieldset>
    <div class="min-h-[1.5rem] font-condensed text-flame">
      {#if $errors?._errors}{$errors?._errors.join('; ')}{/if}
    </div>
    <button type="submit" class="btn color-flame">
      Подтвердить{#if $delayed}<Spinner />{/if}
    </button>
  </form>
</Container>
