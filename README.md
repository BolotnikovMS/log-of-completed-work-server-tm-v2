# Backend часть приложения "Журнал выполненных работ".

## <a name="nav"></a>Навигация:

- [Описание](#description)
- [Технологии](#technologies)
- [Установка](#installation)
- [Ссылка на frontend](#frontend-link)
- [Связаться со мной](#contact-me)

## <a name="description"></a>Описание: [⬆️](#nav)

Backend часть приложения "Журнал выполненных работ", разработанная как API на фреймворке AdonisJS 6. Предоставляет необходимые эндпоинты для аутентификации, создания, чтения, обновления и удаления записей о выполненных работах, а также для работы с объектами.

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

## <a name="frontend-link"></a>Frontend: [⬆️](#nav)

*🔗Ссылка:* [Frontend репозиторий](https://github.com/BolotnikovMS/log-of-completed-work-client-tm.git)

## <a name="contact-me"></a>Связь со мной: [⬆️](#nav)

[📤bolotnikovms@yandex.ru](mailto:bolotnikovms@yandex.ru)
