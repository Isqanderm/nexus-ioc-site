export const routes = [
  {
    title: 'Введение',
    path: '/introduction',
    children: [
      { title: 'Первые шаги', path: '/introduction/first-steps' },
      { title: 'Установка', path: '/introduction/installation' },
    ],
  },
  {
    title: 'Основы',
    path: '/fundamentals',
    children: [
      { title: 'Модули', path: '/fundamentals/modules' },
      { title: 'Внедрение зависимостей', path: '/fundamentals/dependency-injection' },
      { title: 'Жизненный цикл', path: '/fundamentals/lifecycle' },
    ],
  },
  {
    title: 'Продвинутое',
    path: '/advanced',
    children: [
      { title: 'Асинхронные модули', path: '/advanced/async-modules' },
      { title: 'Circular dependencies', path: '/advanced/circular-deps' },
    ],
  },
];
