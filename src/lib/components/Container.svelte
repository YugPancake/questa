<script lang="ts">
  let customClass = '';
  export { customClass as class };
</script>

<div class="container mx-auto px-4 {customClass}">
  <slot />
</div>
