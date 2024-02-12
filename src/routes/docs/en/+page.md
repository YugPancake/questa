---
layout: default
title: 'Documentation'
---

- [Authorization](#authorization)
  - [Sign up](#sign-up-signup)
  - [Log in](#log-in-login)
  - [Character creation](#character-creation-creation)
- [Common](#common)
  - [Header](#header)
  - [Footer](#footer)
  - [About us](#about-us-about)
  - [Documentation in Russian](#documentation-in-russian-docsru)
  - [Documentation in English](#documentation-in-english-docsen)
  - [Character card](#character-card)
- [Quests](#quests-)
  - [Pomodoro timer](#pomodoro-timer)
  - [Board list](#board-list)
  - [Board](#board)
  - [Task list](#task-list)
  - [Task](#task)
- [Shop](#shop-shop)
  - [Item list](#item-list)
  - [Item purchasing](#item-purchasing)
- [Inventory](#inventory-inventory)
  - [Item list](#item-list-1)
- [Guild](#guild-guild)
  - [Guild list](#guild-list)
  - [Guild editing](#guild-editing)
  - [Weekly boss](#weekly-boss)
  - [Battle log](#battle-log)
  - [Guild chat](#guild-chat)
- [Calendar](#calendar-calendar)

# Authorization

## Sign up [/signup](http://localhost:5173/signup)

New account creation.

| Field    | Req. | Type | Restrictions                    | Min. | Max. |
| -------- | ---- | ---- | ------------------------------- | ---- | ---- |
| Name     | Yes  | Text |                                 | 1    | 255  |
| E-mail   | Yes  | Text | Valid unoccupied e-mail address | 1    | 255  |
| Password | Yes  | Text |                                 | 1    | 255  |

After sending the form redirects to the [log in page](#log-in-login).

## Log in [/login](http://localhost:5173/login)

Log in to existing account.

| Field    | Req. | Type | Restrictions                  | Min. | Max. |
| -------- | ---- | ---- | ----------------------------- | ---- | ---- |
| E-mail   | Yes  | Text | Valid existing e-mail address | 1    | 255  |
| Password | Yes  | Text | Existing password             | 1    | 255  |

If the user did not create a character, redirects to the [character creation page](#character-creation-creation).

Otherwise, redirects to the [quests page](#quests-).

## Character creation [/creation](http://localhost:5173/creation)

Character's appearance selection.

| Field  | Req. | Type  |
| ------ | ---- | ----- |
| Body   | Yes  | Radio |
| Eyes   | Yes  | Radio |
| Outfit | Yes  | Radio |
| Class  | Yes  | Radio |

# Common

## Header

Provides navigation and extra information.

- Navigation:
  - [Quests](#quests-)
  - [Shop](#shop-shop)
  - [Inventory](#inventory-inventory)
  - [Guild](#guild-guild)
  - [Calendar](#calendar-calendar)
- Coins amount
- Notifications
- Log off the account

## Footer

Contains authorship information, redirecting to the [about us page](#about-us-about).

## About us [/about](http://localhost:5173/about)

Contains information about the authors, and links to the [Russian](#documentation-in-russian-docsru) and [English](#documentation-in-english-docsen) documentation pages.

## Documentation in Russian [/docs/ru](http://localhost:5173/docs/ru)

Contains information about the structure and interfaces of the service in Russian.

## Documentation in English [/docs/en](http://localhost:5173/docs/en)

Contains information about the structure and interfaces of the service in English.

## Character card

Contains basic character information.

- Avatar
- Name
- Class
- Level
- Health
- Current level experience progress

# Quests [/](http://localhost:5173/)

Page to manage own tasks.

- [Character card](#character-card)
- Main task
- [Pomodoro timer](#pomodoro-timer)
- Board list with tasks

## Pomodoro timer

Таймер для работы по [технике Помидора](https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D1%82%D0%BE%D0%B4_%D0%BF%D0%BE%D0%BC%D0%B8%D0%B4%D0%BE%D1%80%D0%B0). Упрощает тайм-менеджмент.
Timer to work by the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique). Helps with time management.

The technique:

1. Choose the task needed to be focused on.
2. Start the pomodoro timer.
3. Work without distractions.
4. After the pomodoro timer, start the break timer.
5. Take a rest.
6. Return to step 2 and repeat until 4 pomodoros are finished.
7. After the fourth pomodoro start the long break timer.
8. Take a long rest.
9. Return to step 2.

## Board list

Create a new board with the "Add board" button.

### Board editing

| Field      | Req. | Type | Restrictions | Min. | Max. |
| ---------- | ---- | ---- | ------------ | ---- | ---- |
| Board name | Yes  | Text |              | 1    |      |

Buttons:

- Save
- Delete
- Close window

## Board

Contains list of the board's tasks.

Press the board's name to [edit the board](#board-editing).

## Task list

Create a new task with the "+" button.

### Task editing

| Field       | Req. | Type     | Restrictions                    | Min. | Max. |
| ----------- | ---- | -------- | ------------------------------- | ---- | ---- |
| Name        | Yes  | Text     |                                 | 1    |      |
| Description | No   | Text     |                                 |      |      |
| Board       | Yes  | Select   | Valid board                     |      |      |
| Deadline    | No   | Checkbox |                                 |      |      |
| Start       | No   | Date     | Available with deadline toggled |      |      |
| End         | No   | Date     | Available with deadline toggled |      |      |
| Priority    | No   | Select   | Valid priority                  |      |      |

Buttons:

- Save
- Delete
- Close window

## Task

Contains the checkmark and task information.

- Name
- Priority
- Deadline

Press the task to [edit the task](#task-editing).

Press the checkmark to [complete the task](#task-completion).

### Task completion

On pressing the checkmark, the task becomes done if it was not done, and becomes undone if it was done.

If the task has priority, the character gains coins and experience if the task is done, and has them removed if it's undone.

### Leveling up

When the experience amount crosses the level up threshold, the character advances on to the next level.

Max health gets increased, experience progress resets and a new experience threshold gets set.

# Shop [/shop](http://localhost:5173/shop)

Page to buy items.

3 random items are displayed on the top.

## Item list

Contains all the items available for purchase.

Search field can be used to search items by name and description.

Filter panel can be used to select items by category.

## Item purchasing

On clicking the item, the purchase window opens containing:

- Name
- Picture
- Description
- Cost

On purchase the item gets added to the inventory and the character gets coins removed according to the item's cost.

# Inventory [/inventory](http://localhost:5173/inventory)

Page to browse the character's items.

Contains the [character card](#character-card).

## Item list

Contains items belonging to the character.

Search field can be used to search items by name and description.

Filter panel can be used to select items by category.

# Guild [/guild](http://localhost:5173/guild)

Page to browse guild information and chat.

If the character is not a member of any guild, you can create a new guild using the "Create own guild" button.

If the character is a member of a guild, you can leave it using the "Leave guild" button.

Information:

- [Character card](#character-card)
- [Members list](#members-list)
- Guild name
- Guild level
- [Weekly boss](#weekly-boss)
- [Battle log](#battle-log)
- [Guild chat](#guild-chat)

## Guild list

If the character is not a member of any guild, you can join one of the existing guilds.

A list element contains:

- Name
- Members amount
- Guild level

## Guild editing

A guild's level can edit the guild by pressing it's name.

| Field      | Req. | Type | Restrictions | Min. | Max. |
| ---------- | ---- | ---- | ------------ | ---- | ---- |
| Guild name | Yes  | Text |              | 1    |      |

Buttons:

- Save
- Delete
- Close window

## Members list

Shows the guild members' portraits and names.

## Weekly boss

The boss changes every week. On boss change, the health gets replenished and the log gets cleared.

Contains:

- Name
- Health
- Portrait

## Battle log

Contains the record of guild members' actions:

- Character name
- Damage dealt
- Date and time

## Guild chat

The user can send messages to the chat using the input field.

A message contains:

- Character name
- Date and time
- Message text

# Calendar [/calendar](http://localhost:5173/calendar)

Page to browse the calendar with tasks that have deadlines.

By default opens the current month.

Buttons:

- Open current month
- Open previous month
- Open next month
