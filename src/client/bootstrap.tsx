import React from 'react';
import { NexusApplicationsBrowser } from '@nexus-ioc/core/dist/browser';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@components/App';
import { AppModule } from '@apps/app.module';

async function bootstrap() {
  const container = await NexusApplicationsBrowser.create(AppModule).bootstrap();

  const root = hydrateRoot(
    document.getElementById('root')!,
    <BrowserRouter>
      <App />
    </BrowserRouter>
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
