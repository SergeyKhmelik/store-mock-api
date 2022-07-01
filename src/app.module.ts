import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { MONGO_UI } from './constants';

@Module({
  imports: [UsersModule, MongooseModule.forRoot(MONGO_UI), AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
