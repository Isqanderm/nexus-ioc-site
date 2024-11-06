import React from 'react';

const features = [
  {
    title: 'Модульная архитектура',
    description: 'Легко создавайте и управляйте модулями',
  },
  {
    title: 'Внедрение зависимостей',
    description: 'Используйте декораторы для внедрения зависимостей',
  },
  {
    title: 'Управление жизненным циклом',
    description: 'Управляйте жизненным циклом компонентов',
  },
  {
    title: 'Асинхронная загрузка',
    description: 'Загружайте модули асинхронно для улучшения производительности',
  },
];

export const Features: React.FC = () => {
  return (
    <section className="features">
      <div className="container">
        <h2>Возможности</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
