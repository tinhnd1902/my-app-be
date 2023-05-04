import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { CreateChatDto } from './dto/create-chat.dto';
import { ChatService } from './chat.service';

@WebSocketGateway({
  // Enable CORS for All
  cors: {
    origin: `*`,
  },
})
export class ChatGetway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: CreateChatDto) {
    if (message.content.length > 100 || message.content.length < 1) {
      return null;
    }
    this.chatService.saveData(message);
    return this.server.emit('message', message);
  }
}
