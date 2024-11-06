import React from 'react';
import { AppProvider } from '../context/AppContext';
import { Layout } from './Layout';
import '@styles/global.css';
import '@styles/documentation.css';
import '@styles/layout.css';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
};
