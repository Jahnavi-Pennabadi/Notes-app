import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import { Button, Modal } from 'antd';
import { AuthService } from '../../services/auth.services';
import { logOut } from '../../services/api';
import { LogoutOutlined } from '@ant-design/icons';

const Home = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const authServices = new AuthService();

    const goToMainPage = () => {
        navigate('/mainpage');
    };

    const showLogoutModal = () => {
        setIsModalVisible(true);
    };

    const handleLogout = () => {
        logOut()
        sessionStorage.clear()
        setIsModalVisible(false); 
    };

    const handleCancel = () => {
        setIsModalVisible(false); 
    };

    return (
        <div className='main-home-container'>
            <div className='home-page-heading-container'>
                <h1 className='home-heading'>My Notes</h1>
                <Button onClick={showLogoutModal} 
                className='logout-buttons' type = 'dashed'>
                <LogoutOutlined/>
                Logout
                </Button>
            </div>
            <div className='home-container'>
                <h1 className='home-container-heading'>Save Your Thoughts</h1>
                <Button
                    className='keep-button'
                    type='text'
                    style={{ color: 'yellow', boxShadow: '0px 0px 1px' }}
                    variant='link'
                    onClick={goToMainPage}
                >
                    Keep Here
                </Button>
            </div>
            <Modal
                title="Confirm Logout"
                open={isModalVisible}
                onOk={handleLogout}
                onCancel={handleCancel}
                okText="Yes, Logout"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to logout?</p>
            </Modal>
        </div>
    );
};

export default Home;
