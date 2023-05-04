import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Chat } from './entites/chat.entitiy';
import { ChatService } from './chat.service';
import { ChatGetway } from './chat.getway';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  controllers: [],
  providers: [ChatService, ChatGetway],
  exports: [ChatService],
})
export class ChatModule {}
