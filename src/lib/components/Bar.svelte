<script lang="ts">
  export let max: number | undefined;
  export let value: number | undefined;

  const getPercentage = (max: number = 100, value: number = 0) => (value / max) * 100;
</script>

<div class="relative h-10 grow overflow-hidden rounded-full bg-sunset">
  <div class="flex h-full w-full items-center justify-end bg-flame p-2 font-condensed text-fantasy">
    {value}/{max}
  </div>
  <div
    class="absolute inset-0 flex h-full w-full items-center justify-end bg-sunset p-2 font-condensed text-flame"
    style="clip-path: inset(0 0 0 {getPercentage(max, value)}%);%"
  >
    {value}/{max}
  </div>
</div>
