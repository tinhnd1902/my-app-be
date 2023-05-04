import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormConfig } from './orm.config';
import { APP_GUARD } from '@nestjs/core';
import { ChatModule } from './socket/chat/chat.module';
@Module({
  imports: [
    UsersModule,
    ProductsModule,
    AuthModule,
    ChatModule,
    TypeOrmModule.forRoot(ormConfig),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
