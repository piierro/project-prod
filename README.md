<h1>Front-end Project Prod</h1>

## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start:dev:vite - запуск проекта + фейковый бекенд
```

## Конфигурация

Для разработки проект сожердит 2 конфига:
1. Webpack
2. Vite

В папке sctipts находятся различные скрипты для рефакторинка кода.

---

## Работа с данными
 Взаимодействие с данными осуществляется с помощью Redux Toolkit.

 Запросы на сервер осуществляются с помощью RTK query.

---

## Архитектура проекта- Feature-Sliced Design

---
## Скрипты

- `npm run start` - Запускает веб-сервер с помощью Webpack, порт=3000
- `npm run start:vite` - Запускает приложение с использованием Vite
- `npm run start:dev` - Одновременно запускает два процесса: `npm start` (Webpack) и `npm run start:dev:server` для запуска сервера.
- `npm run start:dev:vite` - Одновременно запускает Vite и сервер.
- `npm run start:dev:server` - Запускает локальный сервер с использованием JSON-сервера, что позволяет разрабатывать приложения, использующие REST API.
- `npm run build:dev` -  Создает сборку приложения в режиме разработки с помощью Webpack.
- `npm run build:prod` - Создает сборку приложения в режиме продакшн с использованием Webpack, и указывает URL API для продакшн-окружения.
- `npm run lint:ts` - Запускает ESLint для проверки файлов с расширениями `.ts` и `.tsx` на наличие ошибок и несоответствий стилю.
- `npm run lint:ts:fix` - Запускает ESLint с флагом `--fix`, чтобы автоматически исправлять ошибки в файлах `.ts` и `.tsx`.
- `npm run lint:scss` - Запускает Stylelint для проверки файлов `.scss` на наличие ошибок и несоответствий стилю.
- `npm run lint:scss:fix` - Запускает Stylelint с флагом `--fix`, чтобы автоматически исправлять ошибки в файлах `.scss`.
- `npm run test` -  Запускает тесты с использованием Jest с указанным конфигурационным файлом `jest.config.ts`.

---
## Сущности (entities):

- [Article](/src/entities/Article)
- [Comments](/src/entities/Comments)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Reiting](/src/entities/Reiting)
- [User](/src/entities/User)

 ## Фичи (features):

 - [AddCommentForm](/src/features/AddCommentForm)
 - [ArticleEditForm](/src/features/ArticleEditForm)
 - [ArticleRating](/src/features/ArticleRating)
 - [ArticleReccomendationsList](/src/features/ArticleReccomendationsList)
 - [AuthByUsername](/src/features/AuthByUsername)
 - [AvatarDropdown](/src/features/AvatarDropdown)
 - [EditableProfileCard](/src/features/EditableProfileCard)
 - [NotificationButton](/src/features/NotificationButton)
 - [ProfileRating](/src/features/ProfileRating)
 - [ScrollSaveUI](/src/features/ScrollSaveUI)
 - [ThemeSwitcher](/src/features/ThemeSwitcher)

  
