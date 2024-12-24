import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserServices } from "./user.service";
import { AbstractUser } from "./user.abstract";

@Module({
    imports:[],
    providers : [
        {
            provide:AbstractUser,
            useClass : UserServices
        }
    ],
    controllers : [UserController]
})
export class UserModule{}