import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';
import { SupportModule } from './support/support.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { SeedsModule } from './seeds/seeds.module';
import { ReviewsModule } from './reviews/reviews.module';

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
    CategoryModule,
    ProductsModule,
    SeedsModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
