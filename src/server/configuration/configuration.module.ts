import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ValidateEnvironmentConfiguration } from "src/config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ValidateEnvironmentConfiguration],
    }),
  ]
})
export class ConfigurationModule { }