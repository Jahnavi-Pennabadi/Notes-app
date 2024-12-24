
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { AbstractSharedItem } from "./shareditem.abstract";
import { AbstractSharedItemDao } from "src/database/mssql/abstract/SharedItem.abstract";
import { SocketGateway } from "src/socket/socket.gateway";


@Injectable()
export class SharedItemervices implements AbstractSharedItem {
    private readonly sharedItem: AbstractSharedItemDao
   
    constructor(private readonly _dbSvc: DatabaseService,
         private readonly socketGateway : SocketGateway
    ) {
        this.sharedItem = this._dbSvc.notications
        
    }

    async getAllSharedItem(UserId: any): Promise<any> {
        return await this.sharedItem
            .findAllSharedItem(UserId)
    }


    async findAllSharedNotes(){
        return await this.sharedItem.findAllSharedNotes()
    }

    async createSharedItem(data: any): Promise<any> {
        let response =  await this.sharedItem.postSharedItem(data)
        if(response){
            this.socketGateway.emitEventOnNotification(response)
            return response
        }   
    }

    async updateSharedItem(id: string, data: any): Promise<any> {
        return await this.sharedItem
            .editSharedItem(id, data)
    }

    async deleteSharedItem(id: string): Promise<any> {
        return await this.sharedItem
            .deleteSharedItem(id)
    }

    async updateSharedItemFields(noteId: string, fieldsToUpdate: Partial<any>): Promise<any> {
        if (!Object.keys(fieldsToUpdate).length) {
            throw new Error('No fields provided for update');
        }
        return await this.sharedItem
            .partialSharedItemUpdate(noteId, fieldsToUpdate)
    }

}