<script lang="ts">
  import type { PageData } from './$types';
  import Container from '$lib/components/Container.svelte';
  import { superForm } from 'sveltekit-superforms/client';
  import EmailInput from '$lib/components/forms/EmailInput.svelte';
  import PasswordInput from '$lib/components/forms/PasswordInput.svelte';
  import { loginSchema } from '$lib/zod/schema';

  export let data: PageData;

  const { form, errors, constraints, enhance, delayed } = superForm(data.form, {
    validators: loginSchema,
    validationMethod: 'onblur',
    taintedMessage: null,
  });
</script>

<svelte:head>
  <title>Вход</title>
</svelte:head>

<div class="grow bg-sunset">
  <Container class=" my-16 flex max-w-lg justify-center rounded-2xl bg-fantasy py-16">
    <div>
      <div class="mb-8 text-center text-3xl">Вход</div>
      <form method="POST" class="w-96 space-y-8" use:enhance>
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
      </form>
      <button class="btn color-olive mt-10 h-16 w-96" type="submit">
        Войти{#if $delayed}...{/if}
      </button>
      <p class="mt-10 text-xs">
        Нет аккаунта? <a href="/signup" class="clickable text-flame">Зарегистрироваться</a>
      </p>
    </div>
  </Container>
</div>
