import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '../components/App';
import { StaticRouter } from 'react-router-dom/server';
import { NexusProvider } from 'nexus-ioc-react-adapter';
import fs from 'fs';
import { TranslateService } from '@apps/translate/translate.service';
import { LanguageProvider } from 'src/context/LanguageContext';

export const server = fastify({
  logger: true,
});

// Добавляем поддержку статических файлов
server.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
});

// В режиме разработки добавляем webpack middleware
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require('../../webpack.config')[1]; // client config
  const compiler = webpack(webpackConfig);

  // Настраиваем webpack-dev-middleware
  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true,
    writeToDisk: true,
  });

  // Настраиваем webpack-hot-middleware
  const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  });

  // Оборачиваем middleware для работы с Fastify
  server.addHook('onRequest', (request, reply, done) => {
    // @ts-ignore
    devMiddleware(request.raw, reply.raw, (err) => {
      if (err) return done(err);
      done();
    });
  });

  server.addHook('onRequest', (request, reply, done) => {
    // @ts-ignore
    hotMiddleware(request.raw, reply.raw, (err) => {
      if (err) return done(err);
      done();
    });
  });
}

// Функция для получения имен файлов из манифеста
const getAssets = () => {
  try {
    const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    return {
      css: manifest['main.css'],
      js: manifest['main.js'],
    };
  } catch (error) {
    throw new Error('Error reading manifest:');
  }
};

server.get('*', async (request, reply) => {
  const assets = getAssets();
  const language = request.headers['accept-language']?.split(',')[0] || 'en';
  const translateService = await server.container.get<TranslateService>(TranslateService);

  const reactHtml = renderToString(
    <StaticRouter location={request.url}>
      <LanguageProvider initialLanguage={language}>
        <NexusProvider
          container={server.container as any}
      >
          <App />
        </NexusProvider>
      </LanguageProvider>
    </StaticRouter>
  );

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Nexus IoC - TypeScript IoC Container</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="${assets.css}">
        <script>
          window.__INITIAL_PATH__ = '${request.url}';
          window.__INITIAL_LANGUAGE__ = '${language}';
          window.__INIT_TRANSLATIONS__ = ${JSON.stringify({ [language]: translateService?.getTranslation(language) })};
        </script>
      </head>
      <body>
        <div id="root">${reactHtml}</div>
        <script src="${assets.js}"></script>
      </body>
    </html>
  `;

  reply.type('text/html');
  return html;
});
