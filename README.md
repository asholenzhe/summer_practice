# Проект `summer-practice`

**Цель рефакторинга:** Чётко разделить приложение на слои по обязанностям: API, UI, ядро (сервисы, настройки, роутинг), сторонние компоненты (shadcn), фичи (логика карточек, пользователей и т.д.).

---

## Структура каталогов

```
src/
├── api/                 # HTTP-клиенты и контракты серверного API
│   ├── auth/            # endpoints и типы авторизации (login.ts, register.ts, refreshAccessToken.ts, types.ts)
│   ├── user/            # endpoints и типы работы с пользовтелем (getUser.ts, types.t)
│   └── shared/          # axiosInstance, общие типы и константы для API
│
├── core/                # «Ядро» приложения
│   ├── components/      # глобальные UI‑компоненты (Layout, Header и пр.)
│   ├── constants/       # сквозные константы (пути, ключи локального хранилища и пр.)
│   ├── hooks/           # общие React‑хуки (useToggle, useDropDown и пр.)
│   ├── routes/          # конфигурация маршрутов и навигация
│   └── store/           # глобальный state
│
├── shadcn/              # «Чистые» исходники компонентов shadcn-ui
│
├── ui-kit/              # слой, хранящий Обёртки над shadcn‑компонентами и стилизация
│   ├── components/      # Button, Input, Form и пр.
│   ├── constants/       # константы, специфичные для ui-kit
│   └── hooks/           # хуки для компонентов ui-kit
│
├── user/                # слой, который хранит всю логику пользователя
│   ├── constants/       # константы фичи
│   ├── hooks/           # React‑хуки фичи (useFetchUser и пр.)
│   ├── pages/           # страницы (Profile)
│   └── store/           # хранилище данных для пользователя
│

```

## Принципы группировки

1. **Ясные границы слоёв:** каждый слой отвечает только за свою зону.
2. **Локальность:** специфичные для фичи компоненты, хуки и типы лежат в папке фичи (`user/`, `card/`).
3. **Переиспользуемость:** общие UI-компоненты — в `core/components` или `ui-kit/components`(без бизнес-логики).

---

## Как добавить новую фичу

1. **Создать директорию фичи** в корне `src/`:
   ```bash
   src/<featureName>/
   ├── components/      # UI-компоненты
   ├── hooks/           # хуки React
   ├── utils/           # утилиты и хелперы
   ├── types/           # типы данных
   └── store/           # локальный state
   ```
2. **API-модуль** (при необходимости) создаётся в `src/api/<featureName>/`:
   ```bash
   src/api/<featureName>/
   ├── <featureMethodName>    # функции-запросы(login, getUser)
   └── types.ts               # типы API
   ```
3. **Маршрутизация:**
   - Определить route-config в `core/routes/` или `<featureName>/routes.ts`.
   - Зарегистрировать маршрут в глобальном `<Router>`.
4. **UI-компоненты:**
   - Переиспользуемые и без бизнес-логики — в `ui-kit/components`.
   - С бизнес-логикой — в папке фичи `src/<featureName>/components`.
5. **State management:**
   - Глобальный стейт — только в `core/store/`.
   - Локальный фичевой стейт — в `src/<featureName>/store/`
