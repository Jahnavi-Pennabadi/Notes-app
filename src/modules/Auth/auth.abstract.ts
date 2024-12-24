
export abstract class Auth{
    abstract exchangeCodeWithToken(code: string): Promise<any>;
    abstract refreshToken(refresh_token:string):Promise<any>;
}