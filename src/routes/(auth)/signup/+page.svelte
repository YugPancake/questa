<script lang="ts">
  import type { PageData } from './$types';
  import Container from '$lib/components/Container.svelte';
  import { superForm } from 'sveltekit-superforms/client';
  import EmailInput from '$lib/components/forms/EmailInput.svelte';
  import PasswordInput from '$lib/components/forms/PasswordInput.svelte';
  import TextInput from '$lib/components/forms/TextInput.svelte';
  import { signupSchema } from '$lib/zod/schema';

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

<div class="grow bg-sunset">
  <Container class=" my-16 flex max-w-lg justify-center rounded-2xl bg-fantasy py-16">
    <div>
      <div class="mb-8 text-center text-3xl">Регистрация</div>
      <form method="POST" class="w-96 space-y-8" use:enhance>
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
        {#if $errors?._errors}<p class="font-condensed text-flame">
            {$errors?._errors.join('; ')}
          </p>{/if}
        <button class="btn color-olive mt-10 h-16 w-96" type="submit">
          Зарегистрироваться{#if $delayed}...{/if}
        </button>
        <p class="mt-10 text-center text-xs">
          Уже зарегистрированы? <a href="/login" class="clickable text-flame">Войти</a>
        </p>
      </form>
    </div>
  </Container>
</div>
