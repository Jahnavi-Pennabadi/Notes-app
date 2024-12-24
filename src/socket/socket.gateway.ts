import {SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server,Socket} from 'socket.io'
import { NoteService } from 'src/modules/Note/note.service';

@WebSocketGateway({ cors: true })
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly NoteServices : NoteService) {
    console.log('SocketGateway initialized'); 
  }

  emitEventOnNotification(data: any): void {
    console.log('Emitting notification event:', data);
  
    try {
      if (data && Array.isArray(data)) {
        data.forEach((item) => {
          const itemId = item.dataValues?.ItemId;
          console.log('Extracted ItemId:', itemId);
  
          if (itemId) {
            this.NoteServices.findNoteById(itemId).then((singleNote) => {
              console.log('singleNote:', singleNote);
              this.server.emit('notification', { sharedItem: item, singleNote });
            }).catch((error) => {
              console.error('Error fetching single note:', error);
            });
          } else {
            console.error('ItemId not found in item:', item);
          }
        });
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error emitting notification event:', error);
    }
  }
  
}

  

