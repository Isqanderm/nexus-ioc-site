import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header/Header';
import { useApp } from '../context/AppContext';
import { Introduction } from './pages/Introduction';

export const Layout: React.FC = () => {
  const { theme } = useApp();

  return (
    <div className={`app ${theme}`}>
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/introduction" element={<Introduction />} />
            {/* Остальные роуты будут добавлены позже */}
          </Routes>
        </main>
      </div>
    </div>
  );
};
