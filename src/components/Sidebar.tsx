import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../routes';
import { i18nHook } from '@hooks/i18n';

export const Sidebar: React.FC = () => {
  const i18nTranslate = i18nHook();
  
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {routes.map((section) => (
          <div key={section.title} className="nav-section">
            <h3 className="section-title">
              {i18nTranslate(section.title)}
            </h3>
            <ul className="nav-items">
              {section.children.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  >
                    {i18nTranslate(item.title)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};
