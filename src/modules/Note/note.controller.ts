import { Controller, Get, Post, Body, Param, Delete, Put, Patch, UseGuards, Req } from '@nestjs/common';
import { NoteDao } from 'src/database/mssql/dao/notedao';
import { Note } from 'src/database/mssql/model/notes.model';
import { AbstractNote } from './note.abstract';
import { AuthGuard } from '../Auth/authGuard';
import { AbstractSharedItem } from '../SharedItem/shareditem.abstract';
import { error } from 'console';
import { Auth } from '../Auth/auth.abstract';

@Controller('notes')
export class NoteController {
    constructor(private readonly _note: AbstractNote,private readonly _sharedItem : AbstractSharedItem) {}

    // @Get()
    // async allNotesList(){
    //     return this._note.allNotes()
    // }

    // @Get()
    // async sharedNotes(){
    //     return this._note.findAllSharedNotes()
    // }
    @UseGuards(AuthGuard)
    @Get()
    async getNotes(
        @Req() req?:any
    ) {
        let id = req.user.id
        console.log('userIdNowFromToken',id)
        if(id){
            return this._note.getAllNotes(id);
        }else{
            return this._note.allNotes()
        }
    }

    @Post()
    async createNote(@Body() noteData: Note) {
        return this._note.createNotes(noteData);
    }

    
    @Put(':id')
    async editNote(
        @Param('id') id: string,
        @Body() noteData: any,
    
    ) {
       console.log('ediitablenote',noteData) 
        return this._note.updateNotes(id, noteData);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteNote(@Param('id')  id: string,@Req() req:any) {
        let userid = req.user?.id
        let notesList = await this.getNotes()
        let note = notesList.find((each:any)=>each.createdBy === userid)
        if(note){
        return this._note.deleteNotes(id);
        }else{
            return 'You are not permitted to delete the note'
        }
    }

    @Patch(':id')
    async updateNoteFields(
        @Param('id') noteId: string,
        @Body() fieldsToUpdate: Partial<Note>
    ): Promise<any> {
        return await this._note.updateNoteFields(noteId, fieldsToUpdate);
    }
}
