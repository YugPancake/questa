<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import type { PageData } from './$types';
  import { superForm } from 'sveltekit-superforms/client';
  import { createCharacterSchema } from '$lib/zod/schema';
  import Spinner from '$lib/components/Spinner.svelte';
  import Avatar from '$lib/components/Avatar.svelte';

  export let data: PageData;
  let { user } = data;

  const { form, errors, enhance, delayed } = superForm(data.form, {
    validators: createCharacterSchema,
    validationMethod: 'onblur',
    taintedMessage: null,
  });

  const { classes, avatarBodies, avatarEyeSets, avatarOutfits } = data;
</script>

<svelte:head>
  <title>Создание персонажа | Questa</title>
</svelte:head>

<div class="bg-sunset grow">
  <Container class="flex items-center justify-center p-4">
    <div class="flex w-full max-w-screen-lg flex-col items-center gap-6 md:flex-row">
      <div>
        <Avatar
          avatar={{
            body: avatarBodies.find((e) => e.id === $form.avatarBody)?.fileName,
            eyes: avatarEyeSets.find((e) => e.id === $form.avatarEyes)?.fileName,
            outfit: avatarOutfits.find((e) => e.id === $form.avatarOutfit)?.fileName,
          }}
          class="h-64"
        />
        <p>{user.name}</p>
      </div>
      <form method="post" class="color-fantasy grow rounded-xl p-4" use:enhance>
        <h3 class="text-xl">Создание персонажа</h3>
        <fieldset>
          <legend>Выберите аватар</legend>
          <div class="flex flex-wrap justify-around gap-2">
            {#each avatarBodies as avatarBody}
              <label class="clickable flex flex-col" for="avatarBody-{avatarBody.id}">
                <input
                  class="peer h-0 w-full rounded border-sand outline-none outline-0 checked:border-olive focus:border-olive focus:outline-olive focus:ring-0 focus-visible:border-olive focus-visible:outline-olive"
                  type="radio"
                  id="avatarBody-{avatarBody.id}"
                  name="avatarBody"
                  value={avatarBody.id}
                  bind:group={$form.avatarBody}
                />
                <img
                  width="507"
                  height="750"
                  src="/sprites/{avatarBody.fileName}"
                  alt=""
                  class="h-24 w-auto rounded-xl border-2 border-sand bg-fantasy object-cover active:border-olive peer-checked:border-olive"
                />
              </label>
            {/each}
          </div>
          <div class="min-h-[1.5rem] font-condensed text-flame">
            {#if $errors.avatarBody}{$errors.avatarBody.join('; ')}{/if}
          </div>
          <div class="flex flex-wrap justify-around gap-2">
            {#each avatarEyeSets as avatarEyes}
              <label class="clickable flex flex-col" for="avatarEyes-{avatarEyes.id}">
                <input
                  class="peer h-0 w-full rounded border-sand outline-none outline-0 checked:border-olive focus:border-olive focus:outline-olive focus:ring-0 focus-visible:border-olive focus-visible:outline-olive"
                  type="radio"
                  id="avatarEyes-{avatarEyes.id}"
                  name="avatarEyes"
                  value={avatarEyes.id}
                  bind:group={$form.avatarEyes}
                />
                <img
                  width="507"
                  height="750"
                  src="/sprites/{avatarEyes.fileName}"
                  alt=""
                  class="aspect-square h-24 w-auto rounded-xl border-2 border-sand bg-fantasy object-cover active:border-olive peer-checked:border-olive"
                />
              </label>
            {/each}
          </div>
          <div class="min-h-[1.5rem] font-condensed text-flame">
            {#if $errors.avatarEyes}{$errors.avatarEyes.join('; ')}{/if}
          </div>
          <div class="flex flex-wrap justify-around gap-2">
            {#each avatarOutfits as avatarOutfit}
              <label class="clickable flex flex-col" for="avatarOutfit-{avatarOutfit.id}">
                <input
                  class="peer h-0 w-full rounded border-sand outline-none outline-0 checked:border-olive focus:border-olive focus:outline-olive focus:ring-0 focus-visible:border-olive focus-visible:outline-olive"
                  type="radio"
                  id="avatarOutfit-{avatarOutfit.id}"
                  name="avatarOutfit"
                  value={avatarOutfit.id}
                  bind:group={$form.avatarOutfit}
                />
                <img
                  width="507"
                  height="750"
                  src="/sprites/{avatarOutfit.fileName}"
                  alt=""
                  class="h-12 w-16 rounded-xl border-2 border-sand bg-fantasy object-cover object-bottom active:border-olive peer-checked:border-olive"
                />
              </label>
            {/each}
          </div>
          <div class="min-h-[1.5rem] font-condensed text-flame">
            {#if $errors.avatarOutfit}{$errors.avatarOutfit.join('; ')}{/if}
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
        <div class="flex justify-end">
          <button type="submit" class="btn color-flame">
            Подтвердить{#if $delayed}<Spinner />{/if}
          </button>
        </div>
      </form>
    </div>
  </Container>
</div>
