import { Module } from "@nestjs/common";
import { TypeController } from "./type.controller";
import { AbstractType } from "./type.abstract";
import { TypeServices } from "./type.service";

@Module({
    imports:[],
    providers : [
        {
            provide:AbstractType,
            useClass : TypeServices
        }
    ],
    controllers : [TypeController]
})
export class TypeModule{}