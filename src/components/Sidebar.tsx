import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../routes';

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {routes.map((section) => (
          <div key={section.path} className="nav-section">
            <h3 className="section-title">
              <NavLink to={section.path}>{section.title}</NavLink>
            </h3>
            <ul className="nav-items">
              {section.children.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  >
                    {item.title}
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
