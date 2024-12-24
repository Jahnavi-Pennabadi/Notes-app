import { Module } from "@nestjs/common";
import { Auth } from "./auth.abstract";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AppConfigService } from "src/config/appconfig.service";

@Module({
    imports: [],
    providers: [
        AppConfigService,
        
        {
            provide: Auth,
            useClass: AuthService
        },
    ],
    controllers: [AuthController]
})
export class AuthModule {}
