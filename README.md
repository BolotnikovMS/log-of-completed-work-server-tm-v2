# Backend часть приложения "Журнал выполненных работ".

## <a name="nav"></a>Навигация:

- [Описание](#description)
- [Технологии](#technologies)
- [Установка](#installation)
- [Примеры](#example)
- [Ссылка на frontend](#frontend-link)
- [Связаться со мной](#contact-me)

## <a name="description"></a>Описание: [⬆️](#nav)

Backend часть приложения "Журнал выполненных работ", разработанная как API на фреймворке AdonisJS 6. Предоставляет необходимые эндпоинты для аутентификации, создания, чтения, обновления и удаления записей о выполненных работах, а также для работы с объектами. Аутентификация пользователей происходит через логин и пароль, а последующие запросы через полученный токен.

## <a name="technologies"></a>Технологии: [⬆️](#nav)

- *AdonisJS 6*
- *Exceljs*
- *Sqlite3* (При необходимости можно использовать другую БД)

## <a name="installation"></a>Установка: [⬆️](#nav)

1. Склонируйте репозиторий:
```
git clone https://github.com/BolotnikovMS/log-of-completed-work-server-tm-v2.git
```
- При необходимости добавьте в конце `./` чтобы не создавалась дополнительная папка.

2. Установите зависимости:
```
npm install
```
3. Скопируйте файл `.env.example` и переименуйте в `.env`.
4. Запустите миграции:
```
node ace migration:run
```
5. Запустите сервер:
```
npm run dev
```
6. Первоначальная настройка: <br>
Для первоначального добавления данных и добавления новых пользователей предусмотрена [учетная запись](https://github.com/BolotnikovMS/log-of-completed-work-server-tm-v2/blob/4fa0c1220a8703e40fd0f446e590e16c6e443b98/database/migrations/1708526716433_create_users_table.ts) по умолчанию с ролью админа. После добавления новых пользователей с нужными ролями рекомендуется заблокировать данную учетную запись.

## <a name="example"></a>Примеры запросов: [⬆️](#nav)

Примеры запросов:
- Аутентификация пользователя.
```
curl -X POST http://127.0.0.1:3333/api/v1.0/login
-H "Content-Type: application/json"
-d '{
  "username": "user@example.com",
  "password": "securepassword"
}'
```
- Получение списка выполненных работ.
```
curl -X GET http://127.0.0.1:3333/api/v1.0/completed-works
-H "Authorization: Bearer YOUR_TOKEN"
```

## <a name="frontend-link"></a>Frontend: [⬆️](#nav)

*🔗Ссылка:* [Frontend репозиторий](https://github.com/BolotnikovMS/log-of-completed-work-client-tm.git)

## <a name="contact-me"></a>Связь со мной: [⬆️](#nav)

[📤bolotnikovms@yandex.ru](mailto:bolotnikovms@yandex.ru)
