<script lang="ts">
  const minutesToSeconds = (minutes: number) => minutes * 60;
  const secondsToMinutes = (seconds: number) => Math.floor(seconds / 60);
  const padWithZeroes = (number: number) => number.toString().padStart(2, '0');

  enum State {
    idle,
    inProgress,
    resting,
  }

  const POMODORO_S = minutesToSeconds(25);
  const LONG_BREAK_S = minutesToSeconds(20);
  const SHORT_BREAK_S = minutesToSeconds(5);

  let currentState: State = State.idle;
  let pomodoroTime = POMODORO_S;
  let completedPomodoros = 0;
  let completedRests = 0;
  let interval: any;

  function formatTime(timeInSeconds: number) {
    const minutes = secondsToMinutes(timeInSeconds);
    const remainingSeconds = timeInSeconds % 60;
    return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds)}`;
  }

  function startPomodoro() {
    setState(State.inProgress);
    interval = setInterval(() => {
      if (pomodoroTime === 0) {
        completePomodoro();
      }
      pomodoroTime -= 1;
    }, 1000);
  }

  function setState(newState: State) {
    clearInterval(interval);
    currentState = newState;
  }

  function completePomodoro() {
    completedPomodoros++;
    if (completedPomodoros === 4) {
      rest(LONG_BREAK_S);
      completedPomodoros = 0;
    } else {
      rest(SHORT_BREAK_S);
    }
  }

  function rest(time: number) {
    setState(State.resting);
    pomodoroTime = time;
    interval = setInterval(() => {
      if (pomodoroTime === 0) {
        idle();
        completedRests = completedPomodoros;
      }
      pomodoroTime -= 1;
    }, 1000);
  }

  function cancelPomodoro() {
    idle();
  }

  function idle() {
    setState(State.idle);
    pomodoroTime = POMODORO_S;
  }
</script>

<div class="flex grow flex-col justify-between">
  <div class="flex">
    <div class="flex h-full grow flex-col justify-between">
      <time class="text-6xl">
        {formatTime(pomodoroTime)}
      </time>
      <div class="flex gap-4">
        <div
          class="border-b-2 {currentState === State.inProgress
            ? 'border-olive'
            : 'border-fantasy text-burgundy/50'}"
        >
          Помодоро
        </div>
        <div
          class="border-b-2 {currentState === State.resting
            ? 'border-flame'
            : 'border-fantasy text-burgundy/50'}"
        >
          Перерыв
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center justify-between">
      {#each Array(4).fill(0) as n, i}
        <div
          class="h-4 w-4 rounded-full {currentState === State.resting &&
          i === completedRests
            ? 'bg-flame'
            : i <= completedRests - 1
              ? 'bg-olive'
              : 'bg-sunset'}"
        ></div>
      {/each}
    </div>
  </div>
  <div>
    <button
      class="btn color-olive disabled:bg-fantasy"
      on:click={startPomodoro}
      disabled={currentState !== State.idle}>Старт</button
    >
    <button
      class="btn color-sunset disabled:bg-fantasy"
      on:click={cancelPomodoro}
      disabled={currentState !== State.inProgress}>Стоп</button
    >
    <!--button on:click={completePomodoro}>complete</button-->
  </div>
</div>
