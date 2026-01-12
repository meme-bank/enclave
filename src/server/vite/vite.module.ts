import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ViteRenderInterceptor } from './vite-render.interceptor';
import { ViteService } from './vite.service';

@Module({
  providers: [
    ViteService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ViteRenderInterceptor,
    },
  ],
  exports: [ViteService],
})
export class ViteModule {}
