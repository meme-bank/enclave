import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UnderscoreNamingStrategy, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfiguration } from 'src/config/configuration';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      async useFactory(
        config: ConfigService<EnvironmentConfiguration>
      ) {
        const isProd = config.get("environment_mode", { infer: true }) === "production";

        return {
          /* ---ORM Settings--- */
          /* Driver settings */
          driver: PostgreSqlDriver,
          namingStrategy: UnderscoreNamingStrategy,

          /* Metadata config */
          metadataProvider: TsMorphMetadataProvider,
          metadataCache: {
            // enabled: config.get("environment_mode", { infer: true }) === "production",
            enabled: true,
            pretty: true,
            options: {
              cacheDir: process.cwd() + "/.temp/metadata"
            }
          },

          /* Entities definening */
          entities: [isProd ? "./dist/entities/**/*.js" : "./src/entities/**/*.ts"],
          entitiesTs: ["./src/entities/**/*.ts"],

          /* Migrations */
          migrations: {
            path: './dist/migrations',
            pathTs: './src/migrations',
            glob: '!(*.d).{js,ts}',
            transactional: true,
          },

          /* ---Connection--- */
          dbName: config.get("database.name", { infer: true }),

          /* User Credentials */
          password: config.get("database.password", { infer: true }),
          user: config.get("database.username", { infer: true }),

          /* Connection to database manager */
          host: config.get("database.hostname", { infer: true }),
          port: config.get("database.port", { infer: true }),

          /* ---Context options--- */
          registerRequestContext: true,

          /* ---Debug options--- */
          debug: !isProd,
        };
      }
    })
  ],
})
export class DatabaseModule { }