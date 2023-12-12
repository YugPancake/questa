<script lang="ts">
  import heart from '$lib/assets/icons/heart.svg?raw';
  import star from '$lib/assets/icons/star.svg?raw';
  import type { Avatar, CharacterClass, User, UserStats } from '@prisma/client';
  import { experienceToLevel, getLevelProgress, getHealth } from '$lib/utils/stats';

  export let user: User & { stats: (UserStats & { class: CharacterClass; avatar: Avatar }) | null };

  const level = experienceToLevel(user.stats!.experience);
  const levelDisplay = level + 1;
  const healthMax = getHealth(level);
  const experienceMax = getLevelProgress(user.stats!.experience).needed;
  const experienceValue = getLevelProgress(user.stats!.experience).earned;

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
    value: user.stats!.health,
  };

  const experience: Stat = {
    name: 'Опыт',
    iconSvg: star,
    max: experienceMax,
    value: experienceValue,
  };

  const statValues: Stat[] = [health, experience];
</script>

<img
  alt={user.stats?.avatar.alt}
  src="/avatars/{user.stats?.avatar.fileName}"
  class="aspect-square h-24 rounded-xl border-2 border-olive object-cover xl:h-full"
/>
<div class="flex grow flex-col justify-between gap-2">
  <div>
    <p class="text-3xl">{user.name}</p>
    <hr class="border border-sunset" />
  </div>
  <div>
    <p class="text-flame">{user.stats?.class.name}</p>
    <p class="text-flame">{levelDisplay} уровень</p>
  </div>
  <div class="flex flex-col gap-2">
    {#each statValues as stat}
      <div class="flex items-center gap-2 text-flame">
        {@html stat.iconSvg}
        <div class="relative h-10 grow overflow-hidden rounded-full bg-sunset">
          <div
            class="flex h-full w-full items-center justify-end bg-flame p-2 font-condensed text-fantasy"
          >
            {stat.value}/{stat.max}
          </div>
          <div
            class="absolute inset-0 flex h-full w-full items-center justify-end bg-sunset p-2 font-condensed text-flame"
            style="clip-path: inset(0 0 0 {getPercentage(stat.max, stat.value)}%);%"
          >
            {stat.value}/{stat.max}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
