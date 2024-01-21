<script lang="ts">
  import type { PageData } from './$types';
  import { superForm } from 'sveltekit-superforms/client';
  import EmailInput from '$lib/components/forms/EmailInput.svelte';
  import PasswordInput from '$lib/components/forms/PasswordInput.svelte';
  import TextInput from '$lib/components/forms/TextInput.svelte';
  import { signupSchema } from '$lib/zod/schema';
  import Spinner from '$lib/components/Spinner.svelte';
  import QuefirImg from '$lib/assets/images/quefir.png'

  export let data: PageData;

  const form = superForm(data.form, {
    validators: signupSchema,
    validationMethod: 'onblur',
    taintedMessage: null,
  });

  const { errors, delayed, enhance } = form;
</script>

<svelte:head>
  <title>Регистрация</title>
</svelte:head>

<div
  class="flex grow flex-col items-center justify-center gap-4 bg-sunset py-6 lg:flex-row lg:gap-12 lg:py-12"
>
  <div class="color-fantasy flex w-full max-w-lg flex-col items-center space-y-8 rounded-2xl p-12">
    <div class="text-center text-3xl">Создать аккаунт</div>
    <form method="POST" class="w-full space-y-2" use:enhance>
      <TextInput field="name" label="Имя" {form} />
      <EmailInput field="email" label="E-mail" {form} />
      <PasswordInput field="password" label="Пароль" {form} />
      <div class="min-h-[1.5rem] font-condensed text-flame">
        {#if $errors?._errors}{$errors?._errors.join('; ')}{/if}
      </div>
      <button class="btn color-olive h-16 w-full" type="submit">
        Начать{#if $delayed}<Spinner />{/if}
      </button>
      <p class="text-center font-condensed text-lg">
        Уже зарегистрированы? <a href="/login" class="clickable text-flame">Войти</a>
      </p>
    </form>
  </div>
  <div class="flex max-w-lg flex-col items-center">
    <div class="flex flex-col items-center px-6">
      <div
        class="speech-bubble rounded-2xl bg-fantasy p-4 text-center text-xl text-flame lg:p-12 lg:text-4xl"
      >
        Добро пожаловать в QUESTA!
      </div>
    </div>
    <img src={QuefirImg} alt="" class="max-h-48 lg:max-h-96 w-auto" width="555" height="561" />
  </div>
</div>

<style>
  .speech-bubble {
    position: relative;
  }

  .speech-bubble:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top-color: rgb(250 244 239);
    border-bottom: 0;
    margin-left: -20px;
    margin-bottom: -20px;
  }
</style>
