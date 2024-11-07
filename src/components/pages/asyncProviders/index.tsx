import React from 'react';
import { i18nHook } from '../../../hooks/i18n';
import { CodePreview } from '../../CodePreview';

export const AsyncProviders: React.FC = () => {
  const t = i18nHook();

  return (
    <div className="page">
      <h1>{t('pages.async-providers.title')}</h1>
      <p>{t('pages.async-providers.description')}</p>

      <h2>{t('pages.async-providers.async-factory.title')}</h2>
      <CodePreview title="database.service.ts" language="typescript">
        {`
@Injectable()
export class DatabaseService {
  constructor(
    @Inject('CONNECTION')
    private connection: Promise<Connection>
  ) {}

  async getData() {
    const conn = await this.connection;
    return conn.query('SELECT * FROM users');
  }
}

@Module({
  providers: [
    {
      provide: 'CONNECTION',
      useFactory: async () => {
        const connection = await createConnection();
        await connection.connect();
        return connection;
      }
    },
    DatabaseService
  ]
})
export class AppModule {}`}
      </CodePreview>
    </div>
  );
}; 