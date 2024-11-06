import { NexusApplicationsServer } from '@nexus-ioc/core/dist/server';
import { NexusApplicationInterface } from '@nexus-ioc/core';
import { AppModule } from '@apps/app.module';
import { ConfigService } from '@apps/config/config.service';
import { server } from './controllers';

declare module 'fastify' {
  interface FastifyInstance {
    container: NexusApplicationInterface;
  }
}

async function bootstrap() {
  const container = await NexusApplicationsServer.create(AppModule).bootstrap();

  const configService = await container.get<ConfigService>(ConfigService);

  server.decorate('container', container);

  server.addHook('onReady', function (done) {
    server.container = container;
    done();
  });

  const start = async () => {
    try {
      await server.listen({ port: configService?.getConfig().port });
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };

  start();
}

bootstrap();
