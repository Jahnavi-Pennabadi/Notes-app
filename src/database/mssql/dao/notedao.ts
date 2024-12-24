import { Injectable } from "@nestjs/common";
import { AbstractNoteDao } from "../abstract/note.abstract";
import { InjectModel } from "@nestjs/sequelize";
import { Note } from "../model/notes.model";
import { SharedItem } from "../model/sharedItems.model";
import { Op, Sequelize } from "sequelize";
import { create } from "domain";

@Injectable()
export class NoteDao implements AbstractNoteDao {
    constructor(
        @InjectModel(Note)
        private readonly NoteModel: typeof Note,
        
    ) {}

    async findAllNotes(createdBy: string): Promise<any> {
        try {
            console.log("Fetching all notes (created and shared)...");
    
            // Fetch notes created by the user
            const createdNotes = await this.NoteModel.findAll({
                where: { createdBy:createdBy },
                order: [["createdAt", "ASC"]], // Optional: Order by created date
            });
    
            // // // Fetch notes shared with the user
               const sharedNotes = await this.NoteModel.findAll({
                  include: [
                     {
                         model: SharedItem,
                         as: "sharedItem",  
                         where : {
                             SharedToId : createdBy
                         }
                      }
            
                  ],
                  
               });
    
            // // Combine created and shared notes
              const allNotes = [...createdNotes, ...sharedNotes];
    
            // console.log("All notes found (created + shared):", sharedNotes);
            console.log('trigeredsharedNotes',sharedNotes)
            let data = [...createdNotes,...sharedNotes]
            return data;
        
        } catch (error) {
            console.error("Error fetching all notes:", error);
            throw new Error(error);
        }
    }
    
    async allNotes() {
        return await this.NoteModel.findAll()
    }

    // Other methods like postNote, editNote, etc.

    async postNote(data: Note): Promise<any> {
        try {
            console.log("Creating note:", data);
            let response = await this.NoteModel.create(data);
            console.log("Note created:", response);
            return response;
        } catch (error) {
            console.error("Error creating note:", error);
            throw new Error(error);
        }
    }

    async findNotesById(noteId: string): Promise<Note | null> {
        try {
          const existingNote = await this.NoteModel.findByPk(noteId);
          console.log('noteId',noteId)
          console.log('existingNote',existingNote)
          return existingNote;
        } catch (error) {
          console.error(`Error fetching note with ID ${noteId}:`, error.message);
          throw error;
        }
    }

    async editNote(noteId: string, data: Note): Promise<any> {
        try {
            console.log(`Editing note with id: ${noteId}`);
            let noteExists = await this.NoteModel.findByPk(noteId);
            
            if (!noteExists) {
                return 'Note does not exist';
            }
            let response = await this.NoteModel.update(data, {
                where: { id: noteId }
            });
            console.log("Note updated:", response);
            return response;
        } catch (error) {
            console.error("Error editing note:", error);
            throw new Error(error);
        }
    }

    async updatePartialNote(noteId: string, data: Partial<Note>): Promise<any> {
    try {
            const noteExists = await this.NoteModel.findByPk(noteId);
            if (!noteExists) {
                return 'Note not found';
            }
            await this.NoteModel.update(data, { where: { id: noteId } });
            return await this.NoteModel.findByPk(noteId); // Return updated note
        } catch (error) {
            throw new Error();
        }
    }
    

    async deleteNote(noteId: string): Promise<any> {
        try {
            console.log(`Deleting note with id: ${noteId}`);
            let response = await this.NoteModel.destroy({ where: { id: noteId } });
            if (response === 0) {
                return 'Note not found';
            }
            console.log("Note deleted:", response);
            return response;
        } catch (error) {
            console.error("Error deleting note:", error);
            throw new Error(error.message);
        }
    }

    
}
