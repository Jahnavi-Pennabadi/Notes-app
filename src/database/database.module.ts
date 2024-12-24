import {  Module } from '@nestjs/common';
import { AbstractFolderDao } from './mssql/abstract/folder.abstract';
import { DatabaseService } from './database.service';
import { FolderDao } from './mssql/dao/folderdao';
import { DatabaseConnection } from './mssql/connection/connection.mssql';
import { SequelizeModule } from '@nestjs/sequelize';

import { Note } from './mssql/model/notes.model';
import { Folder } from './mssql/model/folder.model';
import { AbstractNoteDao } from './mssql/abstract/note.abstract';
import { NoteDao } from './mssql/dao/notedao';
import { Users } from './mssql/model/users.model';
import { SharedItem } from './mssql/model/sharedItems.model';
import { AbstractUsersDao } from './mssql/abstract/user.abstract';
import { UsersDao } from './mssql/dao/usersdao';
import { AbstractSharedItemDao } from './mssql/abstract/SharedItem.abstract';
import { SharedItemDao } from './mssql/dao/SharedItem.dao';
import { AbstractTypesDao } from './mssql/abstract/types.abstract';
import { TypesDao } from './mssql/dao/typesdao';
import { Types } from './mssql/model/types.model';

 
@Module({
  
  imports: [DatabaseConnection,SequelizeModule.forFeature([Folder,Note,Users,SharedItem,Types])],
  providers: [
     DatabaseService,
    {
        provide:AbstractFolderDao,
        useClass:FolderDao
    },{
        provide : AbstractNoteDao,
        useClass : NoteDao
    },{
      provide : AbstractUsersDao,
      useClass : UsersDao
    },{
      provide : AbstractSharedItemDao,
      useClass : SharedItemDao
    },{
      provide : AbstractTypesDao,
      useClass : TypesDao
    }
  ],
  exports: [
    DatabaseService,
    {
        provide:AbstractFolderDao,
        useClass:FolderDao
    },{
        provide : AbstractNoteDao,
        useClass : NoteDao
    },{
      provide : AbstractSharedItemDao,
      useClass : SharedItemDao
    },{
      provide : AbstractUsersDao,
      useClass : UsersDao
    },{
      provide : AbstractTypesDao,
      useClass : TypesDao
    }
  ],
})
export class DbModule { }
 
 