<script lang="ts">
  import Container from '$lib/components/Container.svelte';

  export let title = '';
</script>

<svelte:head>
  <title>{title} | Questa</title>
</svelte:head>

<Container class="prose max-w-screen-md">
  <slot />
</Container>
