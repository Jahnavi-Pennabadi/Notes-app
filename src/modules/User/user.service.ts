import { AbstractUsersDao } from "src/database/mssql/abstract/user.abstract";
import { AbstractUser } from "./user.abstract";
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class UserServices implements AbstractUser{
    private readonly _user : AbstractUsersDao
 
    constructor(private readonly _dbSvc:DatabaseService){
        this._user = this._dbSvc.users
    }

    async getAllUsers():Promise<any>{
        return await this._user.findAllUsers()
    }

    async getUserById(id:string){
        return await this._user.findUser(id)
    }

    async createUsers(data:any):Promise<any>{
        return await this._user.postUser(data)
    }

    async updateUsers(id:string,data:any):Promise<any>{
        return await this._user.editUser(id,data)
    }

    async deleteUsers(id:string):Promise<any>{
        return await this._user.deleteUser(id)
    }

    async updateUserFields(noteId: string, fieldsToUpdate: Partial<any>): Promise<any> {
        if (!Object.keys(fieldsToUpdate).length) {
            throw new Error('No fields provided for update');
        }
        return await this._user.partialUserUpdate(noteId, fieldsToUpdate);
    }
    

}