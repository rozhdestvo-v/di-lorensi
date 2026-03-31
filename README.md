# Di Lorensi — Студия красоты в Санкт-Петербурге

Современный одностраничный сайт (SPA) для студии красоты Di Lorensi с плавными анимациями, parallax-эффектами и адаптивным дизайном.

![Di Lorensi Preview](./preview.png)

## 🌟 Особенности

- **Современный стек**: React 18 + Vite + Tailwind CSS + Framer Motion
- **Плавные анимации**: Scroll-triggered анимации, parallax-эффекты, hover-эффекты
- **Адаптивный дизайн**: Mobile-first подход, поддержка всех устройств (320px+)
- **Форма записи**: Валидация через Yup, отправка данных, модальное окно
- **SEO-оптимизация**: Meta tags, Schema.org разметка, семантическая вёрстка
- **Доступность**: ARIA labels, keyboard navigation, focus states

## 📋 Структура сайта

1. **Header** — фиксированная навигация с бургер-меню
2. **Hero** — полноэкранный блок с parallax фоном
3. **Услуги** — карточки услуг с hover-эффектами
4. **Галерея** — masonry сетка с lightbox
5. **Команда** — карточки мастеров с stagger анимацией
6. **Отзывы** — slider с отзывами клиентов
7. **Контакты** — карта, контактная информация, форма записи
8. **Footer** — ссылки, соцсети, юридическая информация

## 🚀 Быстрый старт

### Требования

- Node.js 18+
- npm или yarn

### Установка

```bash
# Клонирование репозитория
git clone <repository-url>
cd Di Lorensi

# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev
```

Сайт откроется по адресу: http://localhost:3000

### Сборка для продакшена

```bash
# Создание production сборки
npm run build

# Предварительный просмотр сборки
npm run preview
```

## 🚀 Деплой на Vercel

### Вариант 1: Через Vercel CLI

```bash
# Установка Vercel CLI
npm i -g vercel

# Деплой
vercel
```

### Вариант 2: Через GitHub

1. Запушьте проект на GitHub
2. Перейдите на [vercel.com](https://vercel.com)
3. Нажмите "New Project"
4. Импортируйте репозиторий
5. Vercel автоматически определит настройки Vite
6. Нажмите "Deploy"

После деплоя сайт будет доступен по адресу `https://your-project.vercel.app`

## 📁 Структура проекта

```
Di Lorensi/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   ├── Gallery.jsx
│   │   ├── Team.jsx
│   │   ├── Reviews.jsx
│   │   ├── Contacts.jsx
│   │   ├── BookingModal.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   └── useScroll.js
│   ├── utils/
│   │   └── formConfig.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 Цветовая палитра

| Цвет       | Hex       | Использование  |
| ---------- | --------- | -------------- |
| Lavender   | `#E9D5FF` | Акценты, фон   |
| Blush      | `#FED7D7` | Акценты, фон   |
| Mint       | `#C7F3D9` | Акценты, фон   |
| Peach      | `#FEF3C7` | Акценты, фон   |
| Background | `#F8FAFC` | Основной фон   |
| Text Dark  | `#1E293B` | Заголовки      |
| Text Gray  | `#475569` | Основной текст |

## 🛠 Технологии

- **React 18** — UI библиотека с hooks
- **Vite** — Сборщик проектов
- **Tailwind CSS 3** — Utility-first CSS фреймворк
- **Framer Motion** — Анимации и transitions
- **React Hook Form** — Управление формами
- **Yup** — Валидация схем
- **React Router** — Навигация по секциям
- **React Icons** — Иконки (Feather Icons)

## 📱 Адаптивность

- **Mobile**: 320px — 767px
- **Tablet**: 768px — 1023px
- **Desktop**: 1024px+

## ✨ Анимации

- **Page Load**: Staggered fade-in элементов
- **Scroll-triggered**: Появление при скролле (useInView)
- **Parallax**: Сдвиг фона на основе scrollYProgress
- **Hover**: Scale, rotate, color shift эффекты
- **Smooth Scroll**: Плавная прокрутка к секциям

## 📧 Форма записи

Форма отправляет данные на email `di.lorensi@mail.ru`. Для реальной отправки необходимо настроить backend или использовать сервис вроде EmailJS.

Пример данных формы:

```javascript
{
  name: "Иван Иванов",
  phone: "+7 (999) 123-45-67",
  email: "ivan@example.com",
  service: "manicure-gel",
  date: "2025-04-15",
  time: "14:00",
  comment: "Хочу к мастеру Анне"
}
```

## 🔧 Настройка

### Изменение контактной информации

Откройте `src/components/Contacts.jsx` и измените данные в объекте `contactInfo`.

### Изменение списка услуг

Откройте `src/utils/formConfig.js` и отредактируйте массив `servicesList`.

### Изменение цветовой схемы

Откройте `tailwind.config.js` и измените цвета в секции `theme.extend.colors`.

## 📈 Производительность

- Lazy loading изображений
- Code splitting через Vite
- Оптимизированные анимации
- Минимальный bundle size

## ♿ Доступность

- ARIA labels для всех интерактивных элементов
- Keyboard navigation
- Focus visible states
- Семантическая HTML разметка
- Контрастность цветов соответствует WCAG

## 📄 Лицензия

Этот проект создан для студии красоты Di Lorensi. Все права защищены.

## 👥 Контакты

- **Адрес**: Санкт-Петербург, Кирочная ул., 52
- **Телефон**: +7 (966) 828-88-78
- **Email**: di.lorensi@mail.ru

---

Сделано с ❤️ для Di Lorensi Beauty Studio
