<script lang="ts">
  export let avatar: {
    body: string | undefined;
    eyes: string | undefined;
    outfit: string | undefined;
  };
  let customClass = '';
  export { customClass as class };
</script>

<div
  class="relative aspect-[507/750] overflow-hidden rounded-xl border-2 border-olive bg-fantasy object-cover {customClass}"
>
  <img
    src={avatar.body ? `/sprites/${avatar.body}` : ''}
    alt=""
    class="h-full w-auto"
    width="507"
    height="750"
  />
  <img
    src={avatar.eyes ? `/sprites/${avatar.eyes}` : ''}
    alt=""
    class="absolute top-0 h-full w-auto"
    width="507"
    height="750"
  />
  <img
    src={avatar.outfit ? `/sprites/${avatar.outfit}` : ''}
    alt=""
    class="absolute top-0 h-full w-auto"
    width="507"
    height="750"
  />
</div>
