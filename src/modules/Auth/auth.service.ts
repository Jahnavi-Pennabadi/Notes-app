import { Inject } from "@nestjs/common";
import axios from "axios";
import { error } from "console";
import { AppConfigService } from "src/config/appconfig.service";

export class AuthService {
    private ClientId: string | undefined;
    private TenantId: string | undefined;
    private RedirectUrl?: string;
    private ClientSecret?: string;

    constructor(@Inject(AppConfigService) private readonly appConfigService: AppConfigService) {
        this.ClientId = this.appConfigService.envConfig.urlDetails.clientid;
        this.TenantId = this.appConfigService.envConfig.urlDetails.tenantid;
        this.RedirectUrl = this.appConfigService.envConfig.urlDetails.redirecturl;
        this.ClientSecret = this.appConfigService.envConfig.urlDetails.clientsecret;
    }

    async exchangeCodeWithToken(code: string) {
        const tokenEndpoint = `https://login.microsoftonline.com/${this.TenantId}/oauth2/v2.0/token`;

        const params = new URLSearchParams({
            client_id: this.ClientId,
            client_secret: this.ClientSecret,
            code: code,
            redirect_uri: this.RedirectUrl,
            grant_type: "authorization_code",
        }).toString();

        try {
            const response = await axios.post(tokenEndpoint, params, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const userdetails = await this.getUserDetails(response.data.access_token);
            const particularUserDetails = await this.getParticularUserDetails(response.data.access_token)
        
            console.log('particular',particularUserDetails)

            let data = { User: { ...userdetails }, access_token: { ...response.data },userDetails : {...particularUserDetails} };
            return data;
        } catch (error: any) {
            console.error("Error exchanging code for token:", error.response || error.message || error);
            throw error;
        }
    }

    async refreshToken(refreshToken: any) {
        const refreshTokenEndPoint = `https://login.microsoftonline.com/${this.TenantId}/oauth2/v2.0/token`;
        const params = new URLSearchParams({
            client_id: this.ClientId,
            scope: "User.Read offline_access",
            refresh_token: refreshToken,
            grant_type: "refresh_token",
            client_secret: this.ClientSecret,
        }).toString();

        try {
            const response = await axios.post(refreshTokenEndPoint, params,{
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            const userdetails = await this.getUserDetails(response.data.access_token);
            if(userdetails.accountEnabled === true){
                let data =  { ...response.data}
                return data; 
            }else{
                throw new error('User Account is Disabled')
            }
            
        } catch (error: any) {
            console.error("Error exchanging code for token:", error.response || error.message || error);
            throw error;
        }
    }

    async getUserDetails(accessToken: string) {
        try {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };
            const response = await axios.get("https://graph.microsoft.com/beta/me?$select=accountEnabled", { headers });
            return response.data;
        } catch (error: any) {
            console.error("Error fetching user details:", error.response || error.message);
            throw error; 
        }
    }

    async getParticularUserDetails(accessToken: string) {
        try {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };
            const response = await axios.get("https://graph.microsoft.com/v1.0/me", { headers });
            console.log('data',response.data)
            return response.data;
        } catch (error: any) {
            console.error("Error fetching user details:", error.response || error.message);
            throw error; 
        }
    }


}
