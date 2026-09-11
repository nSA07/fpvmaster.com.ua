Архітектура та структура проекту (Astro 5+)
1. Концепція Роутингу (Routing)
В Astro роутинг будується автоматично на основі структури папки src/pages/:

/ (src/pages/index.astro) — Головна сторінка: баннери, блоки з головними категоріями та сітками найпопулярніших товарів.
/catalog (src/pages/catalog/index.astro) — Загальний каталог: перелік усіх категорій магазину.
/catalog/[category] (src/pages/catalog/[category].astro) — Сторінка конкретної категорії: показує товари, що належать тільки до вибраної категорії.
/product/[id] (src/pages/product/[id].astro) — Сторінка товару: детальна картка товару з кнопкою «Купити».
2. Файлова структура проекту
src/
├── components/          # Компоненти інтерфейсу
│   ├── common/          # Загальні елементи
│   │   ├── Header.astro # Шапка сайту з навігацією
│   │   ├── Footer.astro # Підвал сайту
│   │   └── Nav.astro    # Меню навігації по категоріях
│   ├── catalog/         # Компоненти для каталогу
│   │   ├── CategoryCard.astro
│   │   └── CategorySection.astro
│   └── product/         # Компоненти для товарів
│       ├── ProductCard.astro
│       └── ProductGrid.astro
│
├── layouts/             # Шаблони сторінок
│   └── BaseLayout.astro # Базовий HTML-шаблон (із Header та Footer)
│
├── pages/               # Динамічні та статичні сторінки (Routes)
│   ├── index.astro                 # Головна сторінка
│   ├── catalog/
│   │   ├── index.astro             # Всі категорії
│   │   └── [category].astro        # Товари категорії (динамічний роут)
│   └── product/
│       └── [id].astro              # Детальна сторінка товару (динамічний роут)
│
├── styles/              # Глобальні стилі
│   └── global.css       # Імпорт Tailwind / бази
│
└── types/               # TypeScript типи (для товарів, категорій)
    └── index.ts