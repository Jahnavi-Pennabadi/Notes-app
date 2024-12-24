import { Form, Input, Button, Card, Typography } from "antd";
import { AuthService } from "../../services/auth.services";
import './login.css'
import { useEffect, useRef } from "react";
import { environments } from "../../environments/environment";
import { Navigate, useNavigate } from "react-router-dom";

const { Title } = Typography;

const LoginPage = () => {
  let inputRef:any = useRef(null)
  let AuthServices = new AuthService()
  const TenantId = environments.tenantId
  const RedirectUrl:any = environments.redirectUrl
  const ClientId = environments.clientId  
 

  const onFinish = async(values: any) => {
    console.log("Login Successful:", values);
      let url = `https://login.microsoftonline.com/${TenantId}/oauth2/v2.0/authorize?client_id=${ClientId}&response_type=code&redirect_uri=${encodeURIComponent(RedirectUrl)}&scope=offline_access%20User.Read&response_mode=query&state=12345&login_hint=${values.email}`;
      window.location.href = url
  };
 
  const onFinishFailed = (errorInfo: any) => {
    console.log("Login Failed:", errorInfo);
  };
  let navigate = useNavigate()

  useEffect(() => {
    const accessToken = sessionStorage.getItem("access_token");
    if (accessToken) {
      navigate("/");
    }
    if(inputRef.current){
      inputRef.current.focus()
    }
  }, [navigate]);

  return (
    <div className="main-login-container">
    <div className="login-container">
        <div>
        <img
      src = "https://img.freepik.com/free-photo/colorful-overloaded-bullet-journal_23-2150248154.jpg?ga=GA1.1.1612615650.1729488310&semt=ais_hybrid"
        alt="login"
        style={{ maxWidth: "390px",maxHeight : '500px'}}
      />
      </div>
      <div className="card-container">
      <img className="login-container-img" src = "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?ga=GA1.1.1612615650.1729488310&semt=ais_hybrid" style={{height: '100px',width : '100px',marginBottom : '20px'}}/>
      <Card style = {{border : 'none',width: '400px'}}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Notes App Login
        </Title>
        <Form
          name="loginForm"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            hasFeedback
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              { 
                pattern: /^[a-zA-Z0-9._%+-]+@g7cr\.com$/, 
                message: "Email must be a valid 'g7cr.com' email address!" 
              },
            ]}
          >
            <Input placeholder="Enter your email" id = "email" ref = {inputRef} className="login-input"/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="login-button" htmlType="submit" >
            <img src = "https://www.pngplay.com/wp-content/uploads/1/Microsoft-Logo-Transparent-Background.png" style={{height : '20px',width:'20px'}}/>   
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
      </div>
      </div>
      </div>
  );
};

export default LoginPage;
