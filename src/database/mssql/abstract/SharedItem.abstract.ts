
export abstract class AbstractSharedItemDao{
    abstract findAllSharedItem(UserId:any):any;
    abstract postSharedItem(Data:any):any;
    abstract findAllSharedNotes();
    abstract editSharedItem(id:string,data:any):any;
    abstract partialSharedItemUpdate(id:string,data:any):any;
    abstract deleteSharedItem(id:string):any;
}