# БИОГЛАЗ — сайт продукта

Одностраничный сайт витаминного комплекса с лютеином БИОГЛАЗ (ТОО «КазБАД»).
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion · Lucide.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production-сборка
npm run start      # запуск собранной версии
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Фотографии и документы

Сайт сам находит файлы перед `dev`/`build` (скрипт `scripts/detect-media.mjs`
пишет манифест `src/content/media.generated.json`). Пока файлов нет, показываются
аккуратные заглушки без вымышленных изображений.

| Что | Куда положить |
| --- | --- |
| Баночка на прозрачном фоне (лучший вариант) | `public/images/bioglaz-jar-transparent.png` (или `.webp`) |
| Фото баночки с фоном | `public/images/bioglaz-jar.jpg` (или `.jpeg/.png/.webp`) |
| Скан свидетельства о регистрации | `public/documents/certificate.jpg` (или `.jpeg/.png/.webp`) |
| PDF свидетельства (необязательно) | `public/documents/certificate.pdf` |

После добавления файлов выполните `npm run build` (или перезапустите `npm run dev`).

## Контент

Все тексты, контакты и реквизиты находятся в одном файле: `src/content/site.ts`.
Десктопная и мобильная версии берут данные только оттуда.

## Структура

```
src/
  app/                 layout, page, globals.css, icon.svg, opengraph-image.tsx
  content/site.ts      весь контент сайта
  lib/                 whatsapp-ссылки, медиа-манифест, прокрутка к разделам
  hooks/               useScrolled, useActiveSection
  components/
    sections/          секции страницы (собирают desktop- и mobile-версии)
    desktop/           десктопные композиции: навигация, hero, состав, применение, преимущества
    mobile/            мобильные композиции: меню, hero, состав, применение, преимущества
    shared/            общие компоненты: кнопки, логотип, анимации, просмотр документа, FAQ, footer
scripts/detect-media.mjs
```

## Публикация на Vercel

1. Загрузите проект в GitHub и импортируйте репозиторий в Vercel (настройки по умолчанию подходят).
2. В Environment Variables задайте `NEXT_PUBLIC_SITE_URL` (например, `https://bioglaz.kz`) —
   используется для canonical и Open Graph. Без неё берётся домен Vercel.
3. Или через CLI: `npx vercel` → `npx vercel --prod`.

## Важно о содержании

БИОГЛАЗ — БАД, не лекарственное средство. На сайте нет обещаний лечения, цен, скидок,
отзывов и выдуманных исследований. Добавляя тексты, сохраняйте этот принцип.
