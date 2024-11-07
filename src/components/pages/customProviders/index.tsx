import React from 'react';
import { i18nHook } from '../../../hooks/i18n';
import { CodePreview } from '../../CodePreview';

export const CustomProviders: React.FC = () => {
  const t = i18nHook();

  return (
    <div className="page">
      <h1>{t('pages.custom-providers.title')}</h1>
      <p>{t('pages.custom-providers.description')}</p>

      <h2>{t('pages.custom-providers.value-providers.title')}</h2>
      <CodePreview language="typescript">
        {`
@Module({
  providers: [
    {
      provide: 'CONFIG',
      useValue: {
        apiUrl: 'https://api.example.com',
        timeout: 3000
      }
    }
  ]
})
export class AppModule {}`}
      </CodePreview>

      <h2>{t('pages.custom-providers.class-providers.title')}</h2>
      <CodePreview language="typescript">
        {`
@Module({
  providers: [
    {
      provide: AbstractLogger,
      useClass: FileLogger
    }
  ]
})
export class AppModule {}`}
      </CodePreview>

      <h2>{t('pages.custom-providers.factory-providers.title')}</h2>
      <CodePreview language="typescript">
        {`
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (config: ConfigService) => {
        const connection = await createConnection(config.getDatabaseConfig());
        return connection;
      },
      inject: [ConfigService]
    }
  ]
})
export class AppModule {}`}
      </CodePreview>
    </div>
  );
}; 