import React from 'react';
import { i18nHook } from '../../../hooks/i18n';
import { CodePreview } from '../../CodePreview';

export const DynamicModules: React.FC = () => {
  const t = i18nHook();

  return (
    <div className="page">
      <h1>{t('pages.dynamic-modules.title')}</h1>
      <p>{t('pages.dynamic-modules.description')}</p>

      <h2>{t('pages.dynamic-modules.configuration.title')}</h2>
      <CodePreview language="typescript">
        {`
interface DatabaseOptions {
  host: string;
  port: number;
  username: string;
  password: string;
}

@Module({
  providers: [DatabaseService]
})
export class DatabaseModule {
  static forRoot(options: DatabaseOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'DATABASE_OPTIONS',
          useValue: options
        },
        DatabaseService
      ],
      exports: [DatabaseService]
    };
  }
}`}
      </CodePreview>

      <h2>{t('pages.dynamic-modules.usage.title')}</h2>
      <CodePreview language="typescript">
        {`
@Module({
  imports: [
    DatabaseModule.forRoot({
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'secret'
    })
  ]
})
export class AppModule {}`}
      </CodePreview>
    </div>
  );
}; 