export abstract class AbstractNote{
    abstract getAllNotes(createdBy:any):Promise<any>;
    abstract createNotes(data:any):Promise<any>;
    abstract allNotes();
    abstract findNoteById(itemId);
    // abstract findAllSharedNotes():Promise<any>;
    abstract updateNotes(id:string,data:any):Promise<any>;
    abstract deleteNotes(id:string):Promise<any>;
    abstract updateNoteFields(id:string,data:any):Promise<any>;
}