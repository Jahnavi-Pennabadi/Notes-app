import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { AbstractUser } from './user.abstract';

@Controller('users')
export class UserController {
    constructor(private readonly _user: AbstractUser) {}

    @Get()
    async getUsers() {
        return this._user.getAllUsers();
    }

    @Get(':id')
    async getUser(
        @Param('id') id: string,
    ) {
        return this._user.getUserById(id)
    }

    @Post()
    async createUser(@Body() noteData: any) {
        return this._user.createUsers(noteData)
    }

    @Put(':id')
    async editUser(
        @Param('id') id: string,
        @Body() noteData: any
    ) {
        return this._user.updateUsers(id,noteData)
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this._user.deleteUsers(id)
    }

    @Patch(':id')
    async updateUserFields(
        @Param('id') noteId: string,
        @Body() fieldsToUpdate: any
    ): Promise<any> {
        return await this._user.updateUserFields(noteId,fieldsToUpdate)
    }
}
