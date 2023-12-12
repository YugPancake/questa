<script lang="ts">
  import type { InputConstraint } from 'sveltekit-superforms';

  export let value: string;
  export let name: string;
  export let label: string | undefined = undefined;
  export let errors: string[] | undefined = undefined;
  export let constraints: InputConstraint | undefined = undefined;
</script>

<label class="label block" for={name}>
  {#if label}<span class="block">{label}</span>{/if}
  <input
    class="input"
    type="password"
    {name}
    id={name}
    bind:value
    aria-invalid={errors ? 'true' : undefined}
    {...$$restProps}
  />
  <div class="font-condensed text-flame min-h-[1.5rem]">{#if errors}{errors.join('; ')}{/if}</div>
</label>
