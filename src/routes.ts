export const routes = [
  {
    title: 'router.introduction',
    path: '/introduction',
    children: [
      { title: 'router.introduction.first-steps', path: '/introduction/first-steps' },
      { title: 'router.introduction.installation', path: '/introduction/installation' },
    ],
  },
  {
    title: 'router.fundamentals',
    path: '/fundamentals',
    children: [
      { title: 'router.fundamentals.modules', path: '/fundamentals/modules' },
      { title: 'router.fundamentals.dependency-injection', path: '/fundamentals/dependency-injection' },
      { title: 'router.fundamentals.lifecycle', path: '/fundamentals/lifecycle' },
    ],
  }
];
