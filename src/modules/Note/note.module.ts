import { Module } from "@nestjs/common";
import { AbstractNote } from "./note.abstract";
import { NoteService } from "./note.service";
import { NoteController } from "./note.controller";
import { SocketGateway } from "src/socket/socket.gateway";
import { Note } from "src/database/mssql/model/notes.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
    imports:[SequelizeModule.forFeature([Note])],
    exports : [NoteService],
    providers : [
        {
            provide:AbstractNote,
            useClass : NoteService
        },
        SocketGateway,
        NoteService
    ],
    controllers : [NoteController]
})
export class NoteModule{}