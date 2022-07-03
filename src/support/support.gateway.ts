import {
  WebSocketGateway,
  OnGatewayConnection,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { interval, take } from 'rxjs';

@WebSocketGateway()
export class SupportGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  private clientActivityMap = new Map<string, boolean>();

  handleConnection(client: Socket): any {
    client.emit('message', 'Welcome to support chat. Please start typing your problem here.');
  }

  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    if (!this.clientActivityMap.has(client.id) || !this.clientActivityMap.get(client.id)) {
      this.clientActivityMap.set(client.id, true);
      interval(5000)
        .pipe(take(5))
        .subscribe({
          next: (num) => client.emit('message', `Support message number ${num + 1}`),
          complete: () => this.clientActivityMap.set(client.id, false),
        });
    }
  }
}
