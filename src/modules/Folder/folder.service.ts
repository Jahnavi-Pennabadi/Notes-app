import { Injectable } from "@nestjs/common";
import { AbstractFolder } from "./folder.abstract";
import { AbstractFolderDao } from "src/database/mssql/abstract/folder.abstract";
import { DatabaseService } from "src/database/database.service";
import { Folder } from "src/database/mssql/model/folder.model";

@Injectable()
export class FolderService implements AbstractFolder{
    private readonly _folder:AbstractFolderDao

    constructor(private readonly _dbSvc:DatabaseService){
        this._folder = this._dbSvc.folder
    }

    async fetchAll(createdBy:any):Promise<any>{
        return await this._folder.fetchAll(createdBy);
    }

    async createFolder(data: Partial<Folder>): Promise<Folder | Error> {
        return await this._folder.postData(data);
    }

    async editFolder(id:string,data:Partial<Folder>): Promise<any>{
        return await this._folder.editData(id,data)
    }

    async deleteFolder(id:string):Promise<any>{
        return await this._folder.deleteData(id)
    }

    async updateFolderFields(folderId: string, fieldsToUpdate: Partial<any>): Promise<any> {
        if (!Object.keys(fieldsToUpdate).length) {
            throw new Error('No fields provided for update');
        }
        return await this._folder.updatePartialFolder(folderId, fieldsToUpdate);
    }
   

}