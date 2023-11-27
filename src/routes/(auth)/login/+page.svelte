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

<Container class="flex justify-center gap-6">
  <form method="POST" class="w-96" use:enhance>
    <EmailInput
      name="email"
      label="Электропочта"
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
    <button class="btn color-olive" type="submit">
      Войти{#if $delayed}...{/if}
    </button>
    <p><a href="/signup" class="clickable text-flame">Зарегистрироваться</a></p>
  </form>
</Container>
