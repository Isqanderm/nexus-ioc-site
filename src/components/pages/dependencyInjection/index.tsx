import React from 'react';
import { i18nHook } from '../../../hooks/i18n';
import { CodePreview } from '../../CodePreview';

export const DependencyInjection: React.FC = () => {
  const t = i18nHook();

  return (
    <div className="page">
      <h1>{t('pages.di.title')}</h1>
      <p>{t('pages.di.description')}</p>

      <h2>{t('pages.di.providers.title')}</h2>
      <p>{t('pages.di.providers.description')}</p>
      <CodePreview language="typescript">
        {`
@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService
  ) {}
}
        `}
      </CodePreview>

      <h2>{t('pages.di.scopes.title')}</h2>
      <p>{t('pages.di.scopes.description')}</p>
    </div>
  );
}; 