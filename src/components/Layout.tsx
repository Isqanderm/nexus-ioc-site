import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header/Header';
import { useApp } from '../context/AppContext';
import { Introduction } from './pages/introduction';
import { Modules } from './pages/modules';
// import { Providers } from './pages/providers';
import { CustomProviders } from './pages/customProviders';
import { AsyncProviders } from './pages/asyncProviders';
import { DynamicModules } from './pages/dynamicModules';
import { InjectionScopes } from './pages/injectionScopes';
import { CircularDependency } from './pages/circularDependency';
import { Testing } from './pages/testing';

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
            <Route path="/introduction/first-steps" element={<Introduction />} />
            <Route path="/introduction/installation" element={<Introduction />} />
            <Route path='/fundamentals/modules' element={<Modules />} />
            {/* <Route path='/fundamentals/providers' element={<Providers />} /> */}

            <Route path='/fundamentals/custom-providers' element={<CustomProviders />} />
            <Route path='/fundamentals/asynchronous-providers' element={<AsyncProviders />} />
            <Route path='/fundamentals/dynamic-modules' element={<DynamicModules />} />
            <Route path='/fundamentals/injection-scopes' element={<InjectionScopes />} />
            <Route path='/fundamentals/circular-dependency' element={<CircularDependency />} />
            <Route path='/fundamentals/testing' element={<Testing />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
