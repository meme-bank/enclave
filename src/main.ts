import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import FastifyVite from '@fastify/vite';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './server/app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfiguration } from './config/configuration';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = app.get(ConfigService<EnvironmentConfiguration>);
  const isProd =
    config.get('environment_mode', { infer: true }) === 'production';

  const fastify = app.getHttpAdapter().getInstance();

  await fastify.register(FastifyVite, {
    root: process.cwd(),
    dev: !isProd,
    spa: true,
    clientModule: './client/entry-client.tsx',
    distDir: join(process.cwd(), '/dist/client'),
  });

  await fastify.vite.ready();

  const port = config.get('application.port', { infer: true }) as number;
  const host = config.get('application.hostname', { infer: true }) as string;

  await app.listen(port, host);
  console.log(`🚀 Octopus Enclave is running on: http://${host}:${port}`);
}
bootstrap().catch(console.error);
