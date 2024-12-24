import { Injectable } from '@nestjs/common';
 
@Injectable()
export class AppConfigService {
    public readonly envConfig: { [key: string]:any } = {};
 
    constructor() {
 
        this.envConfig.app = {
            port: parseInt(process.env.PORT, 10) || 5000,
        };
 
 
        this.envConfig.db = {
            host: process.env.DB_HOST ,
            port: Number(process.env.DB_PORT) ,
            username: process.env.DB_USERNAME ,
            password: process.env.DB_PASSWORD ,
            database: process.env.DB_NAME ,
            domain: process.env.DB_DOMAIN ,
        };

        this.envConfig.urlDetails = {
            clientid : process.env.CLIENT_ID,
            tenantid : process.env.TENANT_ID,
            clientsecret : process.env.CLIENT_SECRET,
            redirecturl : process.env.REDIRECT_URL
 
        }
 
        this.envConfig.jwt = {
            secret: process.env.JWT_SECRET || 'default_jwt_secret',
        };
    }
}
 
 
 