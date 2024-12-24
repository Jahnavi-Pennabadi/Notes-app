export abstract class AbstractSharedItem{
    abstract getAllSharedItem(UserId:any):any;
    abstract createSharedItem(data:any):any;
    abstract findAllSharedNotes();
    abstract updateSharedItem(id:string,data:any):any;
    abstract deleteSharedItem(id:string):any;
    abstract updateSharedItemFields(id:string,data:any):any;
 }