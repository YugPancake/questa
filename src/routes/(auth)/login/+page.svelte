<script lang="ts">
  import type { PageData } from './$types';
  import EmailInput from '$lib/components/forms/EmailInput.svelte';
  import PasswordInput from '$lib/components/forms/PasswordInput.svelte';
  import { superForm } from 'sveltekit-superforms/client';
  import { loginSchema } from '$lib/zod/schema';
  import Spinner from '$lib/components/Spinner.svelte';

  export let data: PageData;

  const form = superForm(data.form, {
    validators: loginSchema,
    validationMethod: 'onblur',
    taintedMessage: null,
  });

  const { errors, delayed, enhance } = form;
</script>

<svelte:head>
  <title>Вход</title>
</svelte:head>

<div class="flex grow items-center justify-center bg-sunset py-6">
  <div class="color-fantasy flex w-full max-w-lg flex-col items-center space-y-8 rounded-2xl p-12">
    <div class="text-center text-3xl">Вход</div>
    <form method="POST" class="w-full space-y-2 lg:w-96" use:enhance>
      <EmailInput field="email" label="E-mail" {form} />
      <PasswordInput field="password" label="Пароль" {form} />
      <div class="min-h-[1.5rem] font-condensed text-flame">
        {#if $errors?._errors}{$errors?._errors.join('; ')}{/if}
      </div>
      <button class="btn color-olive h-16 w-full" type="submit">
        Войти{#if $delayed}<Spinner />{/if}
      </button>
      <p class="text-center font-condensed text-lg">
        Нет аккаунта? <a href="/signup" class="clickable text-flame">Зарегистрироваться</a>
      </p>
    </form>
  </div>
</div>
