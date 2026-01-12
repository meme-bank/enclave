import { Injectable, OnModuleInit } from '@nestjs/common';
import { resolve } from 'path';
import { createServer, ViteDevServer } from 'vite';

@Injectable()
export class ViteService implements OnModuleInit {
  public server: ViteDevServer;

  async onModuleInit() {
    if (this.server) return;

    this.server = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      configFile: resolve(process.cwd(), 'vite.config.mts'),
    });
  }
}
