<script lang="ts">
  import heart from '$lib/assets/icons/heart.svg?raw';
  import star from '$lib/assets/icons/star.svg?raw';
  import type { AvatarLayer, CharacterClass, User, UserStats } from '@prisma/client';
  import { experienceToLevel, getLevelProgress, getHealth } from '$lib/utils/stats';
  import Avatar from './Avatar.svelte';
  import Bar from './Bar.svelte';

  export let user: User & {
    stats:
      | (UserStats & {
          class: CharacterClass;
          avatarBody: AvatarLayer;
          avatarEyes: AvatarLayer;
          avatarOutfit: AvatarLayer;
        })
      | null;
  };

  type Stat = {
    name: string;
    iconSvg: string;
    max: number;
    value: number;
  };
</script>

<!-- <img
  alt={user.stats?.avatar.alt}
  src="/avatars/{user.stats?.avatar.fileName}"
  class="aspect-square h-24 rounded-xl border-2 border-olive object-cover xl:h-full"
/> -->
<Avatar
  avatar={{
    body: user.stats?.avatarBody.fileName,
    eyes: user.stats?.avatarEyes.fileName,
    outfit: user.stats?.avatarOutfit.fileName,
  }}
  class="h-24 xl:h-full"
/>
<div class="flex grow flex-col justify-between gap-2">
  <div>
    <p class="text-3xl">{user.name}</p>
    <hr class="border border-sunset" />
  </div>
  <div>
    <p class="text-flame">{user.stats?.class.name}</p>
    <p class="text-flame">{experienceToLevel(user.stats?.experience) + 1} уровень</p>
  </div>
  <div class="flex flex-col gap-2">
    {#each [{ name: 'Здоровье', iconSvg: heart, max: getHealth(experienceToLevel(user.stats?.experience)), value: user.stats?.health }, { name: 'Опыт', iconSvg: star, max: getLevelProgress(user.stats?.experience).needed, value: getLevelProgress(user.stats?.experience).earned }] as stat}
      <div class="flex items-center gap-2 text-flame">
        {@html stat.iconSvg}
        <Bar max={stat.max} value={stat.value} />
      </div>
    {/each}
  </div>
</div>
