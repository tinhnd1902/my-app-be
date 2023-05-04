import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entites/chat.entitiy';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}

  async saveData(message: CreateChatDto) {
    const newChat = await this.chatRepository.create({
      ...message,
      createAt: new Date(),
    });

    return this.chatRepository.save(newChat);
  }
}
