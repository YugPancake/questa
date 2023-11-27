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

<Container class="flex justify-center gap-6">
  <form method="POST" class="w-96" use:enhance>
    <TextInput
      name="name"
      label="Имя"
      bind:value={$form.name}
      errors={$errors.name}
      constraints={$constraints.name}
    />
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
      Зарегистрироваться{#if $delayed}...{/if}
    </button>
    <p><a href="/login" class="clickable text-flame">Войти</a></p>
  </form>
</Container>
