import React, { useState } from 'react';
import * as styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <span>Nexus IoC</span>
        </div>
        <button className={styles.mobileMenuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`} />
        </button>
        <div className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
          <a href="#docs">Документация</a>
          <a href="#support">Поддержка</a>
          <a href="https://github.com/Isqanderm/ioc" className={styles.githubLink}>
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
};
