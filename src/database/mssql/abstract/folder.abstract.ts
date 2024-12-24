import { Folder } from "../model/folder.model";

export abstract class AbstractFolderDao{
    abstract fetchAll(createdBy:any):Promise<any>;
    abstract postData(data: Partial<Folder>): Promise<Folder | Error>;
    abstract editData(id:string,data:Partial<Folder>):Promise<Folder>;
    abstract deleteData(id:string):Promise<any>;
    abstract updatePartialFolder(id:string,data:Partial<Folder>):Promise<Folder>;
}