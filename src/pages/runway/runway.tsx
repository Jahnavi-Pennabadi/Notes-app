import { Spin } from "antd";
import "./runway.css"; 
import { useEffect } from "react";
import { AuthService } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";

export const RunWay = () => {
    let authServices = new AuthService()
    let navigate = useNavigate()    
 
    useEffect(()=>{
        const getUser=async()=>{
          const accessToken = sessionStorage.getItem("access_token");
          if (accessToken) {
            navigate("/");
          }
         
            try {
             const params=new URLSearchParams(window.location.search);
             const code=params.get('code')
             console.log("Code...",code)
             const res = await authServices.sendCode(code)
             console.log('res',res)
             sessionStorage.setItem("UserAccountStatus", res.User.accountEnabled)
             sessionStorage.setItem("UserID", res.userDetails.id)
             sessionStorage.setItem("access_token",res.access_token.access_token)
             sessionStorage.setItem("refreshToken",res.access_token.refresh_token)
             sessionStorage.setItem("expiresIn",res.access_token.expires_in)
             sessionStorage.setItem('email',res.userDetails.mail)
             sessionStorage.setItem('username', res.userDetails.displayName)
             window.location.href = '/'
            
            }
             
             catch(err){
                console.log(err)
             }
         }
         getUser()
    },[navigate])
 
 
  return (
    <div className="spin-container">
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default RunWay;
