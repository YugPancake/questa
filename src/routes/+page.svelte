<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import Quefir from '$lib/assets/img/quefir.png';
  import heart from '$lib/assets/img/heart.svg';
  import star from '$lib/assets/img/star.svg';
</script>

<svelte:head>
  <title>Questa</title>
</svelte:head>

<div class="color-sunset">
  <Container class="grid grid-cols-1 gap-[70px] py-6 lg:grid-cols-3">
    <div class="color-fantasy rounded-xl p-6">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div class="relative h-[227px] w-[212px] rounded-[15px] border-2 border-stone-500">
          <img alt="Аватар" src={Quefir} class="h-[214px w-[212px]" />
        </div>
        <div>
          <div class="grid grid-cols-4 gap-2 lg:grid-cols-1">
            <div class="text-[26px]">Кефир</div>
            <div class="text-base text-orange-600">Почтальон</div>
            <div class="text-base text-orange-600">56 уровень</div>
            <div class="grid grid-cols-2 gap-[20px] lg:grid-cols-2">
              <img alt="Здоровье" src={heart} />
              <div class="h-10 rounded-[20px] bg-orange-200">
                <div class="pt-[12px] text-xs font-normal text-red-50">98/100</div>
              </div>
              <img alt="Опыт" src={star} />
              <div class="h-10 rounded-[20px] bg-orange-200">
                <div class="pt-[12px] text-xs font-normal text-red-50">98/100</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="color-fantasy rounded-xl p-6">
      <div class="text-2xl">Главная задача</div>
    </div>
    <div class="color-fantasy rounded-xl p-6">
      <div class="text-2xl">Помодоро таймер</div>
    </div>
  </Container>
</div>

<Container class="grow">
  <ul class="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
    <li class="color-sunset rounded-xl p-6">
      <div class="flex">
        <div class="text-[26px]">Привычки</div>
        <button class="btn color-fantasy ml-auto h-[50px] text-flame">Добавить</button>
      </div>
      <div class="color-fantasy mt-[20px] h-20 rounded-[10px]">
        <div class=" pl-[25px] pt-[20px] text-xl">Название</div>
        <div class=" pl-[25px] text-xs text-stone-500">серия:0</div>
      </div>
    </li>
    <li class="color-sunset rounded-xl p-6">
      <div class="flex">
        <div class="text-[26px]">Задачи на день</div>
        <button class="btn color-fantasy ml-auto h-[50px] text-flame">Добавить</button>
      </div>
      <div class="color-fantasy mt-[20px] h-20 rounded-[10px]">
        <div class=" pl-[25px] pt-[20px] text-xl">Название</div>
        <div class=" pl-[25px] text-xs text-stone-500">серия:0</div>
      </div>
    </li>
    <li class="color-sunset rounded-xl p-6">
      <div class="flex">
        <div class="text-[26px]">Задачи</div>
        <button class="btn color-fantasy ml-auto h-[50px] text-flame">Добавить</button>
      </div>
      <div class="color-fantasy mt-[20px] h-20 rounded-[10px]">
        <div class=" pl-[25px] pt-[20px] text-xl">Название</div>
        <div class=" pl-[25px] text-xs text-stone-500">серия:0</div>
      </div>
    </li>
    <li class="color-sunset rounded-xl p-6">
      <div class="flex">
        <div class="text-[26px]">Задачи на неделю</div>
        <button class="btn color-fantasy ml-auto h-[50px] text-flame">Добавить</button>
      </div>
      <div class="color-fantasy mt-[20px] h-20 rounded-[10px]">
        <div class=" pl-[25px] pt-[20px] text-xl">Название</div>
        <div class=" pl-[25px] text-xs text-stone-500">серия:0</div>
      </div>
    </li>

    <div>
      <button class="btn color-sunset text-flame">Добавить доску</button>
    </div>
  </ul>
</Container>
