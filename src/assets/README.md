# Assets / Плейсхолдеры для изображений

## Hero Section
- `https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1920&q=80` — Нежный розовый маникюр (основной фон)
- `https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=1920&q=80` — Французский маникюр (альтернатива)
- `https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=1920&q=80` — Яркий дизайн ногтей (альтернатива)

## Gallery Section (12 фото)
1. `https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80` — Нежный розовый маникюр
2. `https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=800&q=80` — Французский маникюр
3. `https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=80` — Яркий дизайн ногтей
4. `https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80` — Пастельный маникюр
5. `https://images.unsplash.com/photo-1600062947296-5a8a91441b01?w=800&q=80` — Ламинирование бровей
6. `https://images.unsplash.com/photo-1587613990444-6886c0f275b7?w=800&q=80` — Оформление бровей
7. `https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=800&q=80` — Ламинирование ресниц
8. `https://images.unsplash.com/photo-1588531990254-4ea3f8536f7f?w=800&q=80` — Педикюр
9. `https://images.unsplash.com/photo-1599693942150-e6d04d5c2e9f?w=800&q=80` — Дизайн ногтей со стразами
10. `https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80` — Вечерний макияж
11. `https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80` — Маникюр в нюдовых тонах
12. `https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&q=80` — Укладка волос

## Team Section (4 фото мастеров)
1. `https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80` — Анна Смирнова (топ-мастер маникюра)
2. `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80` — Елена Козлова (мастер педикюра)
3. `https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80` — Мария Волкова (бровист-лашмейкер)
4. `https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80` — Ольга Петрова (парикмахер-стилист)

## Reviews Section (6 аватарок)
1. `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80` — Екатерина М.
2. `https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80` — Анна С.
3. `https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80` — Мария К.
4. `https://images.unsplash.com/photo-1554151228-14d9def656ec?w=100&q=80` — Ольга В.
5. `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80` — Дмитрий П.
6. `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80` — Виктория Л.

## Замена изображений

Для замены на свои фотографии:
1. Поместите файлы в папку `src/assets/`
2. Импортируйте в компонентах:
   ```jsx
   import heroImage from '../assets/hero-manicure.jpg';
   ```
3. Или используйте public папку для статических файлов:
   ```jsx
   <img src="/images/hero.jpg" alt="..." />
   ```

## Рекомендации по изображениям

- **Hero**: 1920x1080px, JPG/WebP, качество 80%
- **Gallery**: 800x600px или 600x800px (вертикальные), JPG/WebP
- **Team**: 400x500px (портрет), JPG/WebP
- **Avatars**: 100x100px (квадрат), JPG/WebP

## Оптимизация

Для production рекомендуется:
- Конвертировать изображения в формат WebP
- Использовать srcset для разных разрешений
- Добавить lazy loading для изображений ниже fold
