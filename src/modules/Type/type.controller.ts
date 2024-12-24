import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
// import { AbstractUser } from './user.abstract';
import { AbstractType } from './type.abstract';

@Controller('types')
export class TypeController {
    constructor(private readonly _type: AbstractType) {}

    @Get()
    async getTypes() {
        return this._type.getAllTypes()
    }

    @Post()
    async createType(@Body() typeData: any) {
        return this._type.createTypes(typeData)
    }

    @Put(':id')
    async editType(
        @Param('id') id: string,
        @Body() typeData: any
    ) {
        return this._type.updateTypes(id,typeData)
    }

    @Delete(':id')
    async deleteType(@Param('id') id: string) {
        return this._type.deleteTypes(id)
    }

    @Patch(':id')
    async updateTypeFields(
        @Param('id') noteId: string,
        @Body() fieldsToUpdate: any
    ): Promise<any> {
        return await this._type.updateTypeFields(noteId,fieldsToUpdate)
    }
}
