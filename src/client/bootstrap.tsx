import React from 'react';
import { NexusApplicationsBrowser } from '@nexus-ioc/core/dist/browser';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NexusProvider } from 'nexus-ioc-react-adapter';
import { App } from '@components/App';
import { AppModule } from '@apps/client/app.module';
import { LanguageProvider } from 'src/context/LanguageContext';

async function bootstrap() {
  const container = await NexusApplicationsBrowser.create(AppModule).bootstrap();

  const root = hydrateRoot(
    document.getElementById('root')!,
    <NexusProvider container={container as any}>
      <LanguageProvider initialLanguage={window.__INITIAL_LANGUAGE__}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </LanguageProvider>
    </NexusProvider>
  );

  // Добавляем поддержку HMR
  // @ts-expect-error
  if (module.hot) {
    // @ts-expect-error
    module.hot.accept('@components/App', () => {
      const NextApp = require('@components/App').App;
      root.render(<NextApp />);
    });
  }
}

bootstrap();
