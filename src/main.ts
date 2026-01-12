import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './server/app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfiguration } from './config/configuration';
import { ConsoleLogger } from '@nestjs/common';
import { ViteService } from '@server/vite/vite.service';

async function bootstrap() {
  const logger = new ConsoleLogger('Bootstrap', { prefix: 'Octopus Enclave' });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger,
    },
  );

  const viteService = app.get(ViteService);
  await app.init();
  app.use(viteService.server.middlewares);

  const config = app.get(ConfigService<EnvironmentConfiguration>);

  const port = config.get('application.port', { infer: true }) as number;
  const host = config.get('application.hostname', { infer: true }) as string;

  await app.listen(port, host);
  logger.log(`🚀 Running on: http://${host}:${port}`);
}
bootstrap().catch(console.error);
