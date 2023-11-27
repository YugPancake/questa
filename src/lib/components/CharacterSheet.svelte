<script lang="ts">
  import Quefir from '$lib/assets/images/quefir.png';
  import heart from '$lib/assets/icons/heart.svg?raw';
  import star from '$lib/assets/icons/star.svg?raw';

  export let name: string;
  export let characterClass: string;
  export let level: number;
  export let healthMax: number;
  export let healthValue: number;
  export let experienceMax: number;
  export let experienceValue: number;

  const getPercentage = (max: number, value: number) => (value / max) * 100;

  type Stat = {
    name: string;
    iconSvg: string;
    max: number;
    value: number;
  };

  const health: Stat = {
    name: 'Здоровье',
    iconSvg: heart,
    max: healthMax,
    value: healthValue,
  };

  const experience: Stat = {
    name: 'Опыт',
    iconSvg: star,
    max: experienceMax,
    value: experienceValue,
  };

  const stats: Stat[] = [health, experience];
</script>

<img
  alt="Аватар"
  src={Quefir}
  class="aspect-square h-24 rounded-xl border-2 border-olive object-cover xl:h-full"
/>
<div class="flex grow flex-col justify-between">
  <div>
    <p class="text-3xl">{name}</p>
    <hr class="border border-sunset" />
  </div>
  <div>
    <p class="text-flame">{characterClass}</p>
    <p class="text-flame">{level} уровень</p>
  </div>
  <div class="flex flex-col gap-2">
    {#each stats as stat}
      <div class="flex items-center gap-2 text-flame">
        {@html stat.iconSvg}
        <div class="relative h-10 grow overflow-hidden rounded-full bg-sunset">
          <div
            class="font-condensed flex h-full w-full items-center justify-end bg-flame p-2 text-fantasy"
          >
            {stat.value}/{stat.max}
          </div>
          <div
            class="font-condensed absolute inset-0 flex h-full w-full items-center justify-end bg-sunset p-2 text-flame"
            style="clip-path: inset(0 0 0 {getPercentage(stat.max, stat.value)}%);%"
          >
            {stat.value}/{stat.max}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
