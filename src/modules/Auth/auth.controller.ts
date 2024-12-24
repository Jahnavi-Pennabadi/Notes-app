import { Body, Controller, Post } from "@nestjs/common";
import { Auth } from "./auth.abstract";

@Controller('/auth')
export class AuthController {
    constructor(private readonly auth: Auth) {}

    @Post()
    async getToken(@Body('code') code: string) {
        console.log("Received code:", code);
        try {
            const token = await this.auth.exchangeCodeWithToken(code);
            console.log("Token received:", token);
            return token;
        } catch (error) {
            console.error("Error fetching token:", error.response || error.message || error);
            throw error;
        }
    }

    @Post('/refresh')
    async getRefreshToken(@Body('refreshToken') refreshToken: string) {
        console.log("Received refresh token:", refreshToken);
        try {
            const access_token = await this.auth.refreshToken(refreshToken);
            console.log("Access token after refresh:", access_token);
            return access_token;
        } catch (error) {
            console.error("Error refreshing token:", error.response || error.message || error);
            throw error;  
        }
    }
}
