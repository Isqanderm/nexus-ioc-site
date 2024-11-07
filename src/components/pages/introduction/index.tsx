import React from 'react';
import { i18nHook } from '../../../hooks/i18n';

export const Introduction: React.FC = () => {
  const t = i18nHook();

  return (
    <div className="page">
      <h1>{t('pages.introduction.title')}</h1>
      <p>{t('pages.introduction.description')}</p>
      
      <h2>{t('pages.introduction.what-is.title')}</h2>
      <p>{t('pages.introduction.what-is.description')}</p>
      
      <h2>{t('pages.introduction.key-features.title')}</h2>
      <ul>
        <li>{t('pages.introduction.key-features.item1')}</li>
        <li>{t('pages.introduction.key-features.item2')}</li>
        <li>{t('pages.introduction.key-features.item3')}</li>
        <li>{t('pages.introduction.key-features.item4')}</li>
      </ul>
    </div>
  );
}; 