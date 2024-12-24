import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    let navigate = useNavigate()

    const goBack = () => {
        navigate('/mainpage')
    }
    return (
        <div style={{display :'flex',justifyContent : 'center',alignItems : 'center',backgroundSize : 'cover',height : '100vh'}}>  
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={goBack}>Back Home</Button>}
        />
        </div>
    )
};

export default NotFound;