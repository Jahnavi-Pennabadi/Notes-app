import { AppConfigService } from "src/config/appconfig.service"
import { ConfigModule } from '@nestjs/config';
import { DbModule } from "src/database/database.module";
import { FolderModule } from "src/modules/Folder/folder.module";
import { NoteModule } from "src/modules/Note/note.module";
import { AuthModule } from "src/modules/Auth/auth.module";
import { UserModule } from "src/modules/User/user.module";
import { SharedItemModule } from "src/modules/SharedItem/shareditem.module";
import { SocketGateway } from "src/socket/socket.gateway";
import { TypeModule } from "src/modules/Type/type.module";

export const getProviders= ():any[] =>{
    return [
        AppConfigService,SocketGateway
    ]
}

export const exportProviders= ():any[] =>{
    return [
        AppConfigService,DbModule,FolderModule,NoteModule,AuthModule,UserModule,TypeModule,SharedItemModule,SocketGateway
    ]
}

export const importProviders= ():any[] =>{
    return [
        ConfigModule.forRoot({
            isGlobal:true,
            envFilePath: '.env',
        }),FolderModule,DbModule,NoteModule,AuthModule,UserModule,SharedItemModule,TypeModule
    ]
}

