import { Module } from "@nestjs/common";
import { SharedItemController } from "./shareditem.controller";
import { AbstractSharedItem } from "./shareditem.abstract";
import { SharedItemervices } from "./shareditem.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { SocketGateway } from "src/socket/socket.gateway";
import { SharedItem } from "src/database/mssql/model/sharedItems.model";

@Module({
  imports: [SequelizeModule.forFeature([SharedItem])], 
  exports : [AbstractSharedItem],
  providers: [
    {
      provide: AbstractSharedItem,
      useClass: SharedItemervices, 
    },
    SocketGateway,        
  ],
  controllers: [SharedItemController],
})
export class SharedItemModule {}
