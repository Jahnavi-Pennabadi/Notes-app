import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { AbstractFolder } from "./folder.abstract";
import { Folder } from "src/database/mssql/model/folder.model";

@Controller('/folders')
export class FolderController{
    constructor(private readonly folder:AbstractFolder){}

    @Get(':id')
    async findAll(@Param('id') id:any){
        return this.folder.fetchAll(id);
    }

    @Post()
    async createNewFolder(@Body() data:any){
        return this.folder.createFolder(data);
    }

    @Put('update/:id')
    async editFolder(@Param('id') id:string, @Body() data:any){
        return this.folder.editFolder(id,data)
    }

    @Delete('delete/:id')
    async deleteFolder(@Param('id') id:string){
        return this.folder.deleteFolder(id)
    }

    @Patch(':id')
    async updateFolderFields(
        @Param('id') folderId: string,
        @Body() fieldsToUpdate: Partial<Folder>
    ): Promise<any> {
        return await this.folder.updateFolderFields(folderId, fieldsToUpdate);
    }
}