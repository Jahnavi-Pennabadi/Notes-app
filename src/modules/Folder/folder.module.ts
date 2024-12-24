import { Module } from "@nestjs/common";
import { AbstractFolder } from "./folder.abstract";
import { FolderService } from "./folder.service";
import { FolderController } from "./folder.controller";

@Module({
    imports:[],
    providers : [
        {
            provide:AbstractFolder,
            useClass : FolderService
        }
    ],
    controllers : [FolderController]
})
export class FolderModule{}