# Questa

Трекер задач с элементами RPG.

## Предварительная настройка

Откройте консоль в нужной папке и введите следующие команды:

```bash
# склонировать репозиторий себе
git clone https://github.com/Teatov/questa

# установить зависимости
npm i
```
Инициируйте базу данных

```bash
npx prisma migrate dev
```

Так же вызывайте это при каждом изменении схемы БД

## Настройка IDE

Если вы используете VSCode, то рекомендуется иметь следующие расширения:

- ESLint
- Prettier - Code Formatter
- Svelte for VS Code
- Tailwind CSS IntelliSense
- PostCSS Language Support
- Code Spell Checker
- Russian - Code Spell Checker
- Prisma

А также установить глобально commitizen:

```
npm i -g commitizen
```

## Разработка

После настройки проекта, запустите сервер в режиме разработки:

```bash
npm run dev

# или запустить сервер и сразу открыть страницу в браузере
npm run dev -- --open
```

Просмотреть таблицы базы данных можно с помощью

```bash
npx prisma studio
```

## Сборка

Чтобы собрать финальную версию приложения:

```bash
npm run build
```

Предпросмотр собранного приложения можно осуществить через `npm run preview`.
