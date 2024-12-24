import { Injectable } from "@nestjs/common";
import { AbstractFolderDao } from "./mssql/abstract/folder.abstract";
import { AbstractNoteDao } from "./mssql/abstract/note.abstract";
import { AbstractUsersDao } from "./mssql/abstract/user.abstract";
import { AbstractSharedItemDao } from "./mssql/abstract/SharedItem.abstract";
import { AbstractTypesDao } from "./mssql/abstract/types.abstract";

@Injectable()
export class DatabaseService{
    constructor(
        public readonly folder:AbstractFolderDao,
        public readonly note:AbstractNoteDao,
        public readonly users:AbstractUsersDao,
        public readonly notications:AbstractSharedItemDao,
        public readonly types:AbstractTypesDao
    ){}
}