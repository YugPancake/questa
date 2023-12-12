<script lang="ts">
  // @ts-ignore
  import Calendar from '@event-calendar/core';
  // @ts-ignore
  import DayGrid from '@event-calendar/day-grid';
  import '@event-calendar/core/index.css';
  import Container from '$lib/components/Container.svelte';
  import CharacterSheet from '$lib/components/CharacterSheet.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const { user } = data;

  let options = {
    view: 'dayGridMonth',
    firstDay: 1,
    buttonText: { today: 'Сегодня' },
    theme: function (theme: any) {
      theme.day = 'ec-day !border-2 !border-flame';
      theme.body = 'ec-body !border-2 rounded-b-xl !border-flame overflow-hidden';
      theme.days = 'ec-days !border-2 !border-flame';
      theme.header = 'ec-header !border-2 rounded-t-xl !border-flame overflow-hidden';
      theme.button = 'btn color-sunset';
      theme.buttonGroup = 'inline space-x-2';
      theme.weekdays[0] = 'ec-sun !bg-sunset';
      theme.weekdays[6] = 'ec-sat !bg-sunset';
      theme.today = 'ec-today !bg-sand';
      theme.otherMonth = '!text-flame/50';
      theme.event = 'ec-event sm:!p-2 !shadow-none !rounded-xl !bg-flame font-condensed';
      theme.title = 'ec-title text-xl';
      return theme;
    },
    events: [
      { start: '2023-12-01', end: '2023-12-02', title: 'event', allDay: true },
      { start: '2023-12-03', end: '2023-12-04', title: 'event', allDay: true },
    ],
  };
</script>

<svelte:head>
  <title>Календарь | Questa</title>
</svelte:head>

<div class="color-sunset">
  <Container class="grid grid-cols-1 gap-6 py-6 lg:grid-cols-[1.15fr_1.85fr]">
    <div class="color-fantasy flex gap-6 rounded-xl p-6 lg:h-64">
      <CharacterSheet {user} />
    </div>
    <div class="color-fantasy rounded-xl p-6 lg:h-64"></div>
  </Container>
</div>

<Container class="grow pb-12 pt-6">
  <Calendar {options} plugins={[DayGrid]} />
</Container>
