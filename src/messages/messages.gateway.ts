import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  ConnectedSocket,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { MessageDTO } from './dto/message.dto';

// Universally Unique Identifier 약자로 고유 ID 생성 방식
import { v4 as uuidv4 } from 'uuid';
import { RoomDTO } from './dto/room.dto';

@WebSocketGateway(4200, {
  namespace: 'chat',
  cors: true,
})
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  // Init WebSocket server
  @WebSocketServer() server: Server;

  // Init Logger
  private logger: Logger = new Logger(MessagesGateway.name);

  // MessagesGateway init
  public afterInit(): void {
    return this.logger.log(`Init ${MessagesGateway.name}`);
  }

  // User sends a messages
  @SubscribeMessage('msgToServer')
  handleMessage(@MessageBody() data: MessageDTO): void {
    data.id = uuidv4();
    this.logger.log(`New message: ${data.body} by user: ${data.name}`);
    this.server.to(data.room).emit('msgToClient', data);
  }

  @SubscribeMessage('joinRoom')
  public joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() { room }: RoomDTO,
  ): void {
    this.logger.log(`Client: ${client.id} joined room ${room}`);
    client.join(room);
    client.emit('joinedRoom', room);
  }

  // User leaves a room
  @SubscribeMessage('leaveRoom')
  public leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() { room }: RoomDTO,
  ): void {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  // User disconnects
  public handleDisconnect(@ConnectedSocket() client: Socket): void {
    return this.logger.log(`Client: ${client.id} disconnected`);
  }

  // User connects
  public handleConnection(@ConnectedSocket() client: Socket): void {
    return this.logger.log(`Client: ${client.id} connected`);
  }
}
