import { Folder } from "src/database/mssql/model/folder.model";

export abstract class AbstractFolder{
    abstract fetchAll(createdBy:any):Promise<any>;
    abstract createFolder(data: Partial<Folder>): Promise<Folder | Error>;
    abstract editFolder(id:string,data :Folder): Promise<any>;
    abstract deleteFolder(id:string) : Promise<any>;
    abstract updateFolderFields(id:string,data : Partial<Folder>):Promise<Folder | Error>;
}