import { AbstractUsersDao } from "src/database/mssql/abstract/user.abstract";
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { AbstractType } from "./type.abstract";
import { AbstractTypesDao } from "src/database/mssql/abstract/types.abstract";

@Injectable()
export class TypeServices implements AbstractType{
    private readonly _type : AbstractTypesDao
 
    constructor(private readonly _dbSvc:DatabaseService){
        this._type = this._dbSvc.types
    }

    async getAllTypes():Promise<any>{
        return await this._type.findAllTypes()
    }

    async createTypes(data:any):Promise<any>{
        return await this._type.postType(data)
    }

    async updateTypes(id:string,data:any):Promise<any>{
        return await this._type.editType(id,data)
    }

    async deleteTypes(id:string):Promise<any>{
        return await this._type.deleteType(id)
    }

    async updateTypeFields(typeId: string, fieldsToUpdate: Partial<any>): Promise<any> {
        if (!Object.keys(fieldsToUpdate).length) {
            throw new Error('No fields provided for update');
        }
        return await this._type.partialTypeUpdate(typeId,fieldsToUpdate)
    }
    

}