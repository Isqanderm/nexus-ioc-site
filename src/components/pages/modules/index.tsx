import React from 'react';
import { i18nHook } from '../../../hooks/i18n';
import { CodePreview } from '../../CodePreview';

export const Modules: React.FC = () => {
  const t = i18nHook();

  return (
    <div className="page">
      <h1>{t('pages.modules.title')}</h1>
      <p>{t('pages.modules.description')}</p>

      <h2>{t('pages.modules.feature-modules.title')}</h2>
      <p>{t('pages.modules.feature-modules.description')}</p>
      <CodePreview language="typescript">
        {`
@Module({
  imports: [DatabaseModule],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
        `}
      </CodePreview>

      <h2>{t('pages.modules.shared-modules.title')}</h2>
      <p>{t('pages.modules.shared-modules.description')}</p>
    </div>
  );
}; 