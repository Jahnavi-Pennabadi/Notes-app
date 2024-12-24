import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { AbstractSharedItem } from './shareditem.abstract';

@Controller('shareditems')
export class SharedItemController {
    constructor(private readonly _SharedItem: AbstractSharedItem) {}

    @Get(':userId')
    async getSharedItem(@Param('userId') userId: string) {
    if (!userId) {
        throw new Error('UserId is required');
    }
    return await this._SharedItem.getAllSharedItem(userId);
}

    @Post()
    async createSharedItem(@Body() noteData: any) {
        return this._SharedItem.createSharedItem(noteData)
    }

    @Put(':id')
    async editSharedItem(
        @Param('id') id: string,
        @Body() noteData: any
    ) {
        return this._SharedItem.updateSharedItem(id,noteData)
    }

    @Get()
    async allSharedNotes(){
        return this._SharedItem.findAllSharedNotes()
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this._SharedItem.deleteSharedItem(id)
    }

    @Patch(':id')
    async updateUserFields(
        @Param('id') noteId: string,
        @Body() fieldsToUpdate: any
    ): Promise<any> {
        return await this._SharedItem.updateSharedItemFields(noteId,fieldsToUpdate)
    }
}
