export const routes = [
  {
    title: 'router.introduction',
    children: [
      { title: 'router.introduction.first-steps', path: '/introduction/first-steps' },
      { title: 'router.introduction.installation', path: '/introduction/installation' },
      { title: 'router.fundamentals.modules', path: '/fundamentals/modules' },
      { title: 'router.fundamentals.providers', path: '/fundamentals/providers' },
    ],
  },
  {
    title: 'router.fundamentals',
    children: [
      { title: 'router.fundamentals.custom-providers', path: '/fundamentals/custom-providers' },
      { title: 'router.fundamentals.asynchronous-providers', path: '/fundamentals/asynchronous-providers' },
      { title: 'router.fundamentals.dynamic-modules', path: '/fundamentals/dynamic-modules' },
      { title: 'router.fundamentals.injection-scopes', path: '/fundamentals/injection-scopes' },
      { title: 'router.fundamentals.circular-dependency', path: '/fundamentals/circular-dependency' },
      { title: 'router.fundamentals.testing', path: '/fundamentals/testing' },
    ],
  }
];
