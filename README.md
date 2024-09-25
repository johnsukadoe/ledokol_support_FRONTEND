# Ledokol

## Социальные сети и связь
[![Telegram](https://img.shields.io/badge/Telegram-0088CC?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/ledokolovets)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/ledokolovets)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/miras-shynar-259705201/)
[![TikTok](https://img.shields.io/badge/TikTok-000000?style=for-the-badge&logo=tiktok&logoColor=white)](https://tiktok.com/@ledokolovets)
[![Gmail](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mirasshynar4234@gmail.com)

## О проекте
**Ledokol** — это новая платформа для авторов контента, аналогичная таким сервисам как Boosty и Patreon, но с рядом уникальных возможностей, которых нет у других платформ. Мы стремимся предоставить авторам и их подписчикам инновационные инструменты взаимодействия и монетизации.

### Основные преимущества Ledokol:
1. **Интерактивные Таргетированные Цели** — авторы могут устанавливать конкретные цели с поддержкой подписчиков. Подписчики смогут видеть прогресс и даже влиять на цели.
   
2. **Геймификация Поддержки** — добавление игровых элементов (значки, баллы) за активное участие, что делает поддержку более увлекательной.

3. **Интеграция с AR** — создание контента для виртуальной и дополненной реальности, включая VR-туры.

4. **Индивидуальные Подписки на Контент** — пользователи могут подписываться на конкретные проекты, а не на весь аккаунт автора.

5. **Микротранзакции и Чаевые** — поддержка небольших платежей за отдельные посты или достижения авторов.

6. **Управление Профилем и Публичность** — гибкие настройки видимости контента и профиля для авторов.

7. **Аналитика для Авторов** — инструменты для отслеживания вовлеченности, аудитории и доходов.

8. **Поддержка Аудио и Подкастинга** — функции для записи, публикации и монетизации подкастов.

9. **Интеграция механики сторисов** — авторы могут использовать сторисы для создания временных обновлений для своих подписчиков.

10. **Подарок поста или видео** — возможность отправить подписанный контент другу в качестве подарка.

### В планах разработки:
- Возможность плавного перехода авторов с Boosty и Patreon.
- Функции, которые помогут пользователям видеть, какие обновления и фичи их ждут в ближайшем будущем.

## Для разработчиков

### Как скачать и запустить проект

1. Клонируйте репозиторий:
   ```bash
      git clone https://github.com/johnsukadoe/ledokol_support_FRONTEND.git

2. Установите зависимости:
    ```bash
      npm install

3. Запустите проект:
    ```bash
      npm start

### Стандарты именования файлов

1. **Vue компоненты**:  
   Все компоненты должны иметь расширение `.vue`. Имена компонентов пишутся в `PascalCase` (например, `MyComponent.vue`), чтобы обеспечить единообразие и улучшить читаемость кода. Это особенно полезно, когда компоненты подключаются в других файлах.

   **Пример:**
   Header.vue UserProfile.vue ContentCard.vue

   
2. **TypeScript и JavaScript файлы**:  
Для скриптов используем расширения `.ts` для TypeScript и `.js` для JavaScript. Имена файлов также рекомендуется писать в `camelCase` для соответствия стандартам. TypeScript рекомендуется использовать для типизации и лучшего контроля за кодом.

   **Пример:**
   authService.ts apiClient.ts userUtils.js

3. **Папки и их содержимое**:  
Папки именуем в `kebab-case`, чтобы избежать путаницы между компонентами и папками. Внутри каждой папки компонента могут быть отдельные файлы для логики (скрипты), стилей и шаблонов.

   **Пример структуры:**
   /components /user-profile UserProfile.vue userProfile.ts

Эти стандарты помогают поддерживать порядок и читабельность в проекте, что облегчает работу как текущим, так и новым разработчикам.

### Создание веток
#### Для новых фич: /feature/*название фичи*
#### Для исправления багов: /bugfix/*название бага*

### Swagger

**Swagger** — это инструмент для автоматической генерации документации по API. Он позволяет разработчикам просматривать и тестировать API-запросы прямо в браузере. Swagger предоставляет детализированное описание всех доступных конечных точек, методов, типов данных и возможных ответов, что значительно упрощает интеграцию фронтенда с бэкендом.

Для доступа к нашей документации API используйте следующий адрес:

- **[Swagger Docs](https://api.ledokol.com/swagger)** — здесь вы найдёте всю информацию, необходимую для работы с API проекта, включая описание маршрутов, методов и примерных запросов.
