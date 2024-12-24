import { AbstractNoteDao } from "src/database/mssql/abstract/note.abstract";
import { AbstractNote } from "./note.abstract";
import { DatabaseService } from "src/database/database.service";
import { Injectable } from "@nestjs/common";
import { AbstractSharedItemDao } from "src/database/mssql/abstract/SharedItem.abstract";

@Injectable()
export class NoteService implements AbstractNote{
    private readonly _note : AbstractNoteDao
    private readonly _sharedItem : AbstractSharedItemDao
    
    
    constructor(private readonly _dbSvc:DatabaseService){
        this._note = this._dbSvc.note
        this._sharedItem = this._dbSvc.notications
    }

    async getAllNotes(createdBy:any):Promise<any>{
        if(createdBy){
            let data =  await this._note.findAllNotes(createdBy)
            return data
        }else{
            console.log('Not Available')   
        }        
    }

    async allNotes() {
        let data = await this._note.allNotes()
        return data
    }

    // async findAllSharedNotes(){
    //     return await this._note.findAllSharedNotes()
    // }

    async createNotes(data:any):Promise<any>{
        return await this._note.postNote(data)
    }

    async findNoteById(itemId:any){
        return await this._note.findNotesById(itemId)
    }

    async updateNotes(id:string,data:any):Promise<any>{
         try {
            let allNotesShared = await this._sharedItem.findAllSharedNotes()
            let notes = allNotesShared.find((item:any)=>(
                item.dataValues?.ItemId === id
            ))
            console.log('data',id)
            console.log('notes',notes)
            if(notes && notes.dataValues?.permission === 'edit'){
                let response =  await this._note.editNote(id,data)
                console.log('res',response) 
                return response
            }else if (notes === undefined){
                return await this._note.editNote(id,data)
            }else{
                return ('You are not allowed to do this operation')
          }
            
        } catch (error:any) {
            console.log(error)
        }
    
       
    }

    async deleteNotes(id:string):Promise<any>{
        return await this._note.deleteNote(id)
    }

    async updateNoteFields(noteId: string, fieldsToUpdate: Partial<any>): Promise<any> {
        if (!Object.keys(fieldsToUpdate).length) {
            throw new Error('No fields provided for update');
        }
        return await this._note.updatePartialNote(noteId, fieldsToUpdate);
    }
    
}