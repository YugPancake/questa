<script>
	import line from '$lib/assets/img/line_1.svg';
</script>

<svelte:head>
	<title>Questa</title>
</svelte:head>

<body>
	<div class="main">
		<div class="info">
			<div class="character" />
			<div class="statbox">
				<div class="name">Имя</div>
				<img alt="line" src={line} class="line" />
				<div class="class">Класс</div>
			</div>
		</div>
		<div class="maintask" />
		<div class="timer" />
	</div>

	<div class="tasks" />
</body>

<style>
	@font-face {
		font-display: swap;
		font-family: 'Press Start';
		font-style: normal;
		font-weight: 400;
		src: url('$lib/assets/fonts/press-start-2p-v15-cyrillic_latin-regular.woff2') format('woff2'),
			url('$lib/assets/fonts/press-start-2p-v15-cyrillic_latin-regular.ttf') format('truetype');
	}

	body {
		font-family: Press Start;
		background-color: #faf4ef;
		margin: 0%;
	}
	.main {
		display: flex;
		padding-top: 90px;
		height: 335px;
		background-color: #ffd29d;
		margin: 0%;
	}
	.info {
		display: flex;
		width: 560px;
		height: 270px;
		flex-shrink: 0;
		border-radius: 15px;
		background: #faf4ef;
		margin-top: 32px;
		margin-left: 155px;
	}

	.maintask {
		width: 490px;
		height: 270px;
		flex-shrink: 0;
		border-radius: 15px;
		background: #faf4ef;
		margin-top: 32px;
		margin-left: 70px;
	}
	.timer {
		width: 420px;
		height: 270px;
		flex-shrink: 0;
		border-radius: 15px;
		background: #faf4ef;
		margin-top: 32px;
		margin-left: 70px;
	}

	.character {
		width: 200px;
		height: 227px;
		flex-shrink: 0;
		border-radius: 15px;
		border: 3px solid #918450;
		margin-top: 23px;
		margin-left: 23px;
	}
	.statbox {
		margin-top: 28px;
		margin-left: 25px;
	}
	.name {
		color: #780116;

		font-size: 32px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.line {
		padding: 0;
	}
	.class {
		color: #d8572a;
		font-family: Press Start 2P;
		font-size: 16px;
		padding-top: 18px;
	}
</style>
