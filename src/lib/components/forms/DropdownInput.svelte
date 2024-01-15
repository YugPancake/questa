<script lang="ts" context="module">
  import type { AnyZodObject } from 'zod';
  type T = AnyZodObject;
</script>

<script lang="ts" generics="T extends AnyZodObject">
  import type { Writable } from 'svelte/store';
  import type { z } from 'zod';
  import type { ZodValidation, FormPathLeaves } from 'sveltekit-superforms';
  import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client';

  export let options: { name: string; value: string }[];
  export let form: SuperForm<ZodValidation<T>, unknown>;
  export let field: FormPathLeaves<z.infer<T>>;
  export let label: String;

  const { value, errors } = formFieldProxy(form, field);
</script>

<label class="label block" for={field}>
  <!-- <input
      class="rounded-xl border-2 border-burgundy bg-fantasy p-3 text-xl text-flame outline-none focus:ring-0 focus-visible:border-burgundy focus-visible:outline-dashed focus-visible:outline-burgundy"
      type="checkbox"
      name={field}
      bind:checked={$boolValue}
      aria-invalid={$errors ? 'true' : undefined}
      {...$$restProps}
    /> -->
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
