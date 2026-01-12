import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ValidateEnvironmentConfiguration } from '@/config/configuration';
import { ViteModule } from './vite/vite.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ValidateEnvironmentConfiguration],
    }),
    DatabaseModule,
    ViteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
