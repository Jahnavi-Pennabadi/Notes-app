import { Note } from "../model/notes.model";

export abstract class AbstractNoteDao{
    abstract findAllNotes(createdBy:any):Promise<any>;
    abstract allNotes();
    abstract findNotesById(noteId:any):Promise<any>;
    abstract postNote(data:Note):Promise<any>;
    abstract editNote(id:string,data :Partial<Note>):Promise<any>;
    abstract deleteNote(id:string):Promise<any>;
    abstract updatePartialNote(id:string,data :Partial<Note>):Promise<any>;
}