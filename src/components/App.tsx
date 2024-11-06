import React from 'react';
import { AppProvider } from '../context/AppContext';
import { Header } from './Header';
import { Features } from './Features';
import { CodePreview } from './CodePreview';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="app">
        <Header />
        <Features />
        <CodePreview />
      </div>
    </AppProvider>
  );
}; 