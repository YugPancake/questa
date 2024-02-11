<script lang="ts" context="module">
  import type { AnyZodObject } from 'zod';
  type T = AnyZodObject;
</script>

<script lang="ts" generics="T extends AnyZodObject">
  import type { z } from 'zod';
  import type { ZodValidation, FormPathLeaves } from 'sveltekit-superforms';
  import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client';

  export let form: SuperForm<ZodValidation<T>, unknown>;
  export let field: FormPathLeaves<z.infer<T>>;
  export let label: String | undefined = undefined;

  const { value, errors } = formFieldProxy(form, field);
</script>

<label class="label block w-full" for={field}>
  {#if label}<span class="block">{label}</span>{/if}
  <input
    class="input w-full"
    type="text"
    name={field}
    id={field}
    bind:value={$value}
    aria-invalid={$errors ? 'true' : undefined}
    {...$$restProps}
  />
  <div class="min-h-[1.5rem] font-condensed text-flame">
    {#if $errors}{$errors?.join('; ')}{/if}
  </div>
</label>
