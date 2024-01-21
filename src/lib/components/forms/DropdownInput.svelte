<script lang="ts" context="module">
  import type { AnyZodObject } from 'zod';
  type T = AnyZodObject;
</script>

<script lang="ts" generics="T extends AnyZodObject">
  import type { z } from 'zod';
  import type { ZodValidation, FormPathLeaves } from 'sveltekit-superforms';
  import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client';

  export let options: { name: string; value: string | number | null }[];
  export let form: SuperForm<ZodValidation<T>, unknown>;
  export let field: FormPathLeaves<z.infer<T>>;
  export let label: String;

  const { value, errors } = formFieldProxy(form, field);
</script>

<label class="label block" for={field}>
  {#if label}<span>{label}</span>{/if}
  <select class="input" name={field} id={field} bind:value={$value}>
    {#each options as option}
      <option selected={option.value == $value} value={option.value}>{option.name}</option>
    {/each}
  </select>
  <div class="min-h-[1.5rem] font-condensed text-flame">
    {#if $errors}{$errors?.join('; ')}{/if}
  </div>
</label>
