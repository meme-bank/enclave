import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ViteRender } from './vite/vite-render.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('html')
  @ViteRender()
  public html() {
    return {
      saloloh: 'ipidor',
    };
  }
}
