<script lang="ts">
  import coin from '$lib/assets/icons/coin.svg?raw';

  export let fileName: string;
  export let name: string;
  export let cost: number | null | undefined = undefined;
</script>

<div class="group h-36 w-36 rounded-xl border-2 border-olive object-cover">
  <img src="/sprites/items/{fileName}" alt="" class="object-cover group-hover:hidden" />
  <div class="hidden h-full flex-col justify-between p-2 group-hover:flex">
    <p class="max-h-full">{name}</p>
    {#if cost}
      <p class="flex items-center">
        <span>{@html coin}</span>{cost}
      </p>
    {/if}
  </div>
</div>
