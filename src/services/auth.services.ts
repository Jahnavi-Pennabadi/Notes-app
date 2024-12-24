import { environments } from "../environments/environment";
import axiosInstance from "./api";

export class AuthService {
  private ClientId: string | undefined;
  private TenantId: string | undefined;
  private RedirectUrl?: string;

  constructor() {
    this.ClientId = environments.clientId;
    this.TenantId = environments.tenantId;
    this.RedirectUrl = environments.redirectUrl;
  }

  async getCode() {
    try {
      if (!this.ClientId || !this.TenantId || !this.RedirectUrl) {
        throw new Error("Missing required environment variables");
      }

      const url = `https://login.microsoftonline.com/${this.TenantId}/oauth2/v2.0/authorize?client_id=${this.ClientId}&response_type=code&redirect_uri=${encodeURIComponent(
        this.RedirectUrl
      )}&scope=offline_access%20User.Read&response_mode=query&state=12345`;

      window.location.href = url;
    } catch (error: any) {
      console.error("Error in getCode:", error);
      throw error;
    }
  }

  async sendCode(code: any) {
    try {
      if (!code) {
        throw new Error("Authorization code is required");
      }

      const response = await axiosInstance.post(
        "/auth",
        { code },
        { headers: { "Content-Type": "application/json" } }
      );

      return response.data;
    } catch (error: any) {
      console.error("Error in sendCode:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  }


}
