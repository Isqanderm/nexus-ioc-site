import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '../components/App';
import { StaticRouter } from 'react-router-dom/server';
import fs from 'fs';

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
      css: manifest['main.css'] || 'styles.css',
      js: manifest['main.js'] || 'bootstrap.js',
    };
  } catch (error) {
    console.error('Error reading manifest:', error);
    return {
      css: 'styles.css',
      js: 'bootstrap.js',
    };
  }
};

server.get('*', async (request, reply) => {
  const assets = getAssets();

  const reactHtml = renderToString(
    <StaticRouter location={request.url}>
      <App />
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
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <script>
          window.__INITIAL_PATH__ = '${request.url}';
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
