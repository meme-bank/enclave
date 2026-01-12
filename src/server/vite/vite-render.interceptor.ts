import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VITE_RENDER_KEY } from './vite-render.decorator';
import { FastifyReply, FastifyRequest } from 'fastify';
import { join } from 'path';
import { ViteService } from './vite.service';
import { readFileSync } from 'fs';
import { ServerRenderFunction } from '@/shared/ServerRenderFunction';

@Injectable()
export class ViteRenderInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private viteService: ViteService,
  ) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const viteRender = this.reflector.get<boolean | string>(
      VITE_RENDER_KEY,
      context.getHandler(),
    );

    if (!viteRender) return next.handle();

    const http = context.switchToHttp();
    const request = http.getRequest<FastifyRequest>();
    const reply = http.getResponse<FastifyReply>();

    return next.handle().pipe(
      map(async (data) => {
        const originalUrl = request.raw.url;
        const url =
          typeof viteRender === 'string' ? viteRender : originalUrl || '/';

        try {
          let template = readFileSync(
            join(process.cwd(), 'src', 'client', 'index.html'),
            'utf-8',
          );
          template = await this.viteService.server.transformIndexHtml(
            url,
            template,
            originalUrl,
          );

          const SSR_OUTLET = '<!--ROOT_OUTLET-->';
          const [head, tail] = template.split(SSR_OUTLET);

          const { render } = (await this.viteService.server.ssrLoadModule(
            join(process.cwd(), 'src', 'client', 'entry-server.tsx'),
          )) as { render: ServerRenderFunction };

          if (!render || typeof render !== 'function') {
            throw new Error('Failed to load entry-server.ts');
          }

          let didError = false;

          reply.raw.setHeader('Content-Type', 'text/html');

          const stream = render(url, data, {
            onShellReady: () => {
              reply.raw.statusCode = didError ? 500 : 200;

              reply.raw.write(head);
              stream.pipe(reply.raw);
            },
            onShellError(error) {
              // Ошибка до того, как успели что-то отправить
              throw new InternalServerErrorException(error);
            },
            onAllReady() {
              reply.raw.write(tail);
              reply.raw.end();
            },
            onError(error) {
              didError = true;
              throw new InternalServerErrorException(error);
            },
          });
        } catch (error: unknown) {
          console.error(error);
          if (error instanceof Error) {
            this.viteService.server.ssrFixStacktrace(error);
            reply.status(500).send(JSON.stringify(error.stack));
            if (error instanceof HttpException) {
              throw error;
            }
          } else {
            reply.status(500).send(JSON.stringify('Unknown error'));
          }
        }
      }),
    );
  }
}
