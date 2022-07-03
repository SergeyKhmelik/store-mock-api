import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';
import { SupportModule } from './support/support.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService): MongooseModuleFactoryOptions => ({
        uri: configService.getOrThrow('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthenticationModule,
    SupportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
