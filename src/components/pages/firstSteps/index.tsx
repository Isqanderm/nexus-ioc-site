import React from 'react';
import { i18nHook } from '../../../hooks/i18n';
import { CodePreview } from '../../CodePreview';

export const FirstSteps: React.FC = () => {
  const t = i18nHook();

  return (
    <div className="page">
      <h1>{t('pages.first-steps.title')}</h1>
      
      <h2>{t('pages.first-steps.installation.title')}</h2>
      <CodePreview language="bash">
        npm install @nexus-ioc/core
      </CodePreview>
      
      <h2>{t('pages.first-steps.basic-example.title')}</h2>
      <p>{t('pages.first-steps.basic-example.description')}</p>
      <CodePreview language="typescript">
        {`
import { Injectable, Module, NexusApplications } from '@nexus-ioc/core';

@Injectable()
class UserService {
  getUsers() {
    return ['User1', 'User2'];
  }
}

@Module({
  providers: [UserService]
})
class AppModule {}

async function bootstrap() {
  const app = await NexusApplications
    .create(AppModule)
    .bootstrap();
    
  const userService = app.get(UserService);
  console.log(userService.getUsers());
}

bootstrap();
        `}
      </CodePreview>
    </div>
  );
}; 