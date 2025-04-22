# Task Management Web App (Internship Project)

## Описание проекта
Это полнофункциональное веб-приложение для управления задачами. Проект разработан в рамках стажировки **Avito FE Tech Internship 2025 Wave 2**. Включает управление:

- Задачами (issues)
- Досками (boards)
- Командами (teams)
- Пользователями (users)

Проект построен на разделении клиентской и серверной логики:
- **Frontend:** React + Vite
- **Backend:** Go + Gin + SQLite

## Стек технологий

### Frontend:
- React (Vite + TypeScript)
- TailwindCSS
- React Router
- React Query (@tanstack/react-query)

### Backend:
- Go (Golang)
- Gin Web Framework
- SQLite
- GORM (ORM)

## Установка и запуск проекта

### Запуск backend:
```bash
cd "tech-internship\Tech Internships\Frontend\Frontend-trainee-assignment-spring-2025\server\cmd\service"
go run main.go
```
- Сервер будет доступен на `http://localhost:8080`
- Swagger-документация: `http://localhost:8080/swagger/index.html`

### Запуск frontend:
```bash
cd "project-root\src"
npm install
npm run dev
```
- Интерфейс доступен на `http://localhost:5173`

## Основные интерфейсные страницы

### /teams
- Список всех команд
- Переход к `/team/:teamId` (информация), `/team/:teamId/tasks`, `/team/:teamId/boards`

### /team/:teamId
- Информация о команде
- Список пользователей и досок, связанных с командой

### /team/:teamId/tasks
- Список всех задач команды

### /team/:teamId/boards
- Список досок команды

### /boards
- Список всех досок

### /board/:boardId
- Просмотр задач на доске
- Кнопка "Создать задачу"

### /board/:boardId/create-task
- Форма создания задачи
- Выбор названия, описания, исполнителя и приоритета

### /tasks
- Список всех задач
- Переход к детальной информации о задаче

### /task/:taskId
- Просмотр и редактирование задачи
- Поля: название, описание, статус, исполнитель, приоритет
- Кнопка удаления задачи

### /users
- Список всех пользователей
- Отображение: ФИО, email, команда, описание, количество задач

### /users/:id/tasks
- Задачи, назначенные на пользователя
- Фильтрация по статусу задачи

## API Эндпоинты

### Задачи:
- `GET /api/v1/tasks` — все задачи
- `GET /api/v1/tasks/:taskId` — получить задачу
- `POST /api/v1/tasks/create` — создать задачу
- `PUT /api/v1/tasks/update/:taskId` — обновить
- `DELETE /api/v1/tasks/:taskId` — удалить
- `PUT /api/v1/tasks/updateStatus/:taskId` — изменить статус

### Доски:
- `GET /api/v1/boards` — все доски
- `GET /api/v1/boards/:boardId` — задачи на доске

### Команды:
- `GET /api/v1/teams` — список команд
- `GET /api/v1/teams/:teamId` — информация о команде
- `GET /api/v1/teams/:teamId/tasks` — задачи команды

### Пользователи:
- `GET /api/v1/users` — список пользователей
- `GET /api/v1/users/:id/tasks` — задачи пользователя

## Реализованные фичи

- CRUD задачи
- Списки задач: глобальные, по пользователям, доскам и командам
- Фильтрация задач по статусу
- Выбор исполнителя и приоритета при создании
- Обновление статуса, описания, названия задачи
- Удаление задачи
- Всплывающее окно для создания задачи (`TaskDrawer`)
- Унифицированный UI для команд, досок, пользователей и задач
- Защита от неправильных данных, UX-валидация
- Предзаполненные данные из seed-файла

## Типизация TypeScript

- Все типы описаны в `src/types/`
- Используются в API, хуках и компонентах

## Примерные маршруты

| Страница                      | Назначение                      |
|-------------------------------|---------------------------------|
| `/tasks`                      | Все задачи                      |
| `/task/:taskId`               | Детали задачи                   |
| `/board/:boardId`             | Задачи на доске                 |
| `/board/:boardId/create-task` | Создание задачи на доске        |
| `/users`                      | Все пользователи                |
| `/users/:id/tasks`            | Задачи пользователя             |
| `/teams`                      | Все команды                     |
| `/team/:teamId`               | Информация о команде            |
| `/team/:teamId/tasks`         | Задачи команды                  |
| `/team/:teamId/boards`        | Доски команды                   |

## Автор

Разработано в рамках стажировки **Avito FE Tech Internship 2025**

Автор: Бахадыр Расулов  
Telegram: @narcissiiist_69  
Email: bahadyr2004@mail.ru
