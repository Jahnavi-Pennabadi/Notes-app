import axios from 'axios';
import { environments } from '../environments/environment';

const isTokenExpired = () => {
  const accessToken = sessionStorage.getItem("access_token");
  const expiresIn = sessionStorage.getItem("expiresIn");

  if (!accessToken || !expiresIn) return true;

  const expiryTime = Date.now() + Number(expiresIn) * 1000;
  return Date.now() >= expiryTime;
};

let tenantId = environments.tenantId
export const logOut = async() =>  {
  try {
    if (!tenantId) {
      throw new Error("TenantId is required for logout");
    }

    const azureLogoutUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(
      "http://localhost:3000/login"
    )}`;
    
    window.location.href = azureLogoutUrl;
    sessionStorage.clear()
  } catch (error: any) {
    console.error("Error in logOut:", error);
    throw error;
  }
}



const getFreshAccessToken=  async() => {
  const savedRefreshToken = sessionStorage.getItem("refresh_token");
  if (!savedRefreshToken) {
    return null;
  }

  try {
    const response:any = await axios.post(
      "http://localhost:5000/auth/refresh",
      { refreshToken: savedRefreshToken },
      { headers: { "Content-Type": "application/x-www-form-urlencoded", } }
    );
    const { accessToken, refreshToken } = response.data;
    sessionStorage.setItem("access_token", accessToken);
    sessionStorage.setItem("refresh_token", refreshToken);
    return accessToken;
  } catch (error: any) {
    console.error("Error fetching fresh access token:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
}
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem('access_token');    
    if (token || isTokenExpired()) {
      const newToken = await getFreshAccessToken();
      config.headers['Authorization'] = `Bearer ${token}`;   
    } 

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
