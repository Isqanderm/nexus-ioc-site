import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '../components/App';

export const server = fastify({
  logger: true
});

// Добавляем поддержку статических файлов
server.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/'
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
    writeToDisk: true
  });

  // Настраиваем webpack-hot-middleware
  const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
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

server.get('/', async (request, reply) => {
  const reactHtml = renderToString(React.createElement(App));
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Nexus IoC - TypeScript IoC Container</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          :root {
            --primary-gradient: linear-gradient(90deg, #FF4D4D 0%, #F9CB28 100%);
            --secondary-gradient: linear-gradient(90deg, #2B32B2 0%, #1488CC 100%);
            --background-dark: #1a1a1a;
            --text-primary: #ffffff;
            --text-secondary: rgba(255, 255, 255, 0.7);
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Inter', sans-serif;
            background: var(--background-dark);
            color: var(--text-primary);
            line-height: 1.6;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          .header {
            padding: 2rem 0;
          }

          .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
          }

          .logo-text {
            font-size: 1.5rem;
            font-weight: 700;
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .nav-links {
            display: flex;
            gap: 2rem;
            align-items: center;
          }

          .nav-links a {
            color: var(--text-secondary);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
          }

          .nav-links a:hover {
            color: var(--text-primary);
          }

          .hero {
            padding: 6rem 0;
            text-align: center;
          }

          .hero h1 {
            font-size: 4rem;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 1.5rem;
          }

          .gradient-text {
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .hero-subtitle {
            font-size: 1.25rem;
            color: var(--text-secondary);
            max-width: 600px;
            margin: 0 auto 2rem;
          }

          .hero-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
          }

          .button {
            padding: 0.875rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            transition: transform 0.2s ease;
          }

          .button:hover {
            transform: translateY(-2px);
          }

          .button.primary {
            background: var(--primary-gradient);
            color: white;
          }

          .button.secondary {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .code-preview {
            padding: 4rem 0;
          }

          .code-wrapper {
            background: #1E1E1E;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
          }

          .code-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.05);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .file-name {
            color: var(--text-secondary);
            font-size: 0.875rem;
          }

          .code-block {
            padding: 1.5rem;
            overflow-x: auto;
            font-family: 'Fira Code', monospace;
            font-size: 0.875rem;
            line-height: 1.7;
            color: #A9B7C6;
          }

          .github-link svg {
            fill: var(--text-secondary);
            transition: fill 0.3s ease;
          }

          .github-link:hover svg {
            fill: var(--text-primary);
          }
        </style>
      </head>
      <body>
        <div id="root">${reactHtml}</div>
        <script src="/public/bootstrap.js"></script>
      </body>
    </html>
  `;
  
  reply.type('text/html');
  return html;
});