<script lang="ts">
  import type { PageData } from './$types';
  import Container from '$lib/components/Container.svelte';
  import { superForm } from 'sveltekit-superforms/client';
  import EmailInput from '$lib/components/forms/EmailInput.svelte';
  import PasswordInput from '$lib/components/forms/PasswordInput.svelte';
  import TextInput from '$lib/components/forms/TextInput.svelte';
  import { signupSchema } from '$lib/zod/schema';
  import Spinner from '$lib/components/Spinner.svelte';

  export let data: PageData;

  const { form, errors, constraints, enhance, delayed } = superForm(data.form, {
    validators: signupSchema,
    validationMethod: 'onblur',
    taintedMessage: null,
  });
</script>

<svelte:head>
  <title>Регистрация</title>
</svelte:head>

<div class="flex grow items-center justify-center bg-sunset">
  <div
    class="color-fantasy my-16 flex max-w-lg flex-col items-center space-y-8 rounded-2xl p-12"
  >
    <div class="text-center text-3xl">Регистрация</div>
    <form method="POST" class="w-96 space-y-2" use:enhance>
      <TextInput
        name="name"
        label="Имя"
        bind:value={$form.name}
        errors={$errors.name}
        constraints={$constraints.name}
      />
      <EmailInput
        name="email"
        label="E-mail"
        bind:value={$form.email}
        errors={$errors.email}
        constraints={$constraints.email}
      />
      <PasswordInput
        name="password"
        label="Пароль"
        bind:value={$form.password}
        errors={$errors.password}
        constraints={$constraints.password}
      />
      <div class="min-h-[1.5rem] font-condensed text-flame">
        {#if $errors?._errors}{$errors?._errors.join('; ')}{/if}
      </div>
      <button class="btn color-olive h-16 w-96" type="submit">
        Зарегистрироваться{#if $delayed}<Spinner />{/if}
      </button>
      <p class="text-center font-condensed text-lg">
        Уже зарегистрированы? <a href="/login" class="clickable text-flame">Войти</a>
      </p>
    </form>
  </div>
</div>
