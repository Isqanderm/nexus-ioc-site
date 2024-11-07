import React from 'react';
import { i18nHook } from '../../../hooks/i18n';
import { CodePreview } from '../../CodePreview';

export const InjectionScopes: React.FC = () => {
  const t = i18nHook();

  return (
    <div className="page">
      <h1>{t('pages.injection-scopes.title')}</h1>
      <p>{t('pages.injection-scopes.description')}</p>

      <h2>{t('pages.injection-scopes.singleton.title')}</h2>
      <CodePreview language="typescript">
        {`
@Injectable({ scope: Scope.SINGLETON })
export class UserService {
  private users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
  }
}`}
      </CodePreview>

      <h2>{t('pages.injection-scopes.request.title')}</h2>
      <CodePreview language="typescript">
        {`
@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  constructor(
    @Inject(REQUEST) private request: Request
  ) {}
}`}
      </CodePreview>

      <h2>{t('pages.injection-scopes.transient.title')}</h2>
      <CodePreview language="typescript">
        {`
@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  private id = Math.random();

  log(message: string) {
    console.log(\`[\${this.id}] \${message}\`);
  }
}`}
      </CodePreview>
    </div>
  );
}; 