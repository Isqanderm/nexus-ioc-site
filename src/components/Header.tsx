import React, { useState } from 'react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <span className="logo-text">Nexus IoC</span>
          </div>
          <button 
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`} />
          </button>
          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <a href="#docs">Документация</a>
            <a href="#support">Поддержка</a>
            <a href="https://github.com/Isqanderm/ioc" className="github-link">
              GitHub
            </a>
          </div>
        </nav>
        <div className="hero">
          <h1>
            Прогрессивный
            <span className="gradient-text"> IoC контейнер</span>
            <br /> для TypeScript
          </h1>
          <p className="hero-subtitle">
            Создавайте масштабируемые приложения с использованием современных паттернов разработки
          </p>
          <div className="hero-buttons">
            <a href="#start" className="button primary">Начать работу</a>
            <a href="#docs" className="button secondary">Документация</a>
          </div>
        </div>
      </div>
    </header>
  );
}; 