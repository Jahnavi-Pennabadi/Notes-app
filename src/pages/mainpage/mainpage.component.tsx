import './mainpage.css';
import TabComponent from '../../components/tabs/tabs.component';
import { images } from '../../assets/images';
import { Badge, Button, Dropdown, Menu, Modal, Card } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { logOut } from '../../services/api';
import { BellFilled, CloseOutlined, LogoutOutlined } from '@ant-design/icons';
import { notifyNotes } from '../../features/note/note.slice';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../../features/notifications/notifications.slice';

const MainPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const dispatch: any = useDispatch();  
  const userId = sessionStorage.getItem('UserID')
 
  useEffect(() => {
    if (userId) {
      dispatch(getNotifications(userId));
    }
  }, []);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  

  const notifications = useSelector((s: any) => s.notificationSlice.notificationToParticularUser);
  const notifyCount = useSelector((s:any) => s.noteSlice.notificationCount)
  const notes = useSelector((s: any) => s.noteSlice.notesList);
  let intialCount = notifications.length
  let updatedCount = intialCount + notifyCount
  let notifcationsData = useSelector((s:any)=>s.notificationSlice.displayNotifications)
  let combinedNotifications = [...notifications,...notifcationsData]

  const notificationMenu = (
    <div>
        
      {combinedNotifications.length > 0 ? (
        combinedNotifications.map((note: any, index: number) => {
          const sharednote = notes.find((each: any) => each.id === note.ItemId);
          return (
              <Card style={{ padding: '1px' }} className='notify-card' onClick={() => dispatch(notifyNotes(true))}>
                <span style={{ fontWeight: '600px' }} >
                  You have received a note {sharednote?.title} from {note.sharedByName}
                </span>
              </Card>
          );
        })
      ) : (
          <span>No Notifications</span>
      )}
    </div>
  );


  const showLogoutModal = () => setIsModalVisible(true);

  const handleOk = () => {
    setIsModalVisible(false);
    sessionStorage.clear();
    logOut();
  };

  const handleCancel = () => setIsModalVisible(false);

  return (
    <div className="main-first-page-containers">
      <div className="main-page-containers">
        <ToastContainer />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={images.logo} style={{ width: '100px', height: '60px' }} alt="Logo" />
            <h1 style={{ paddingBottom: '1px' }}>G7CR Note</h1>
          </div>
          <div className="notifications">
              <Button type="text" className="notify" onClick={() => openSidebar()}>
                <Badge count={updatedCount}>
                  <BellFilled style={{fontSize : '28px'}}/> 
                  {/* <img src = "https://th.bing.com/th/id/OIP.V2liyL7xokBQShsb3DA3QwHaD0?w=348&h=179&c=7&r=0&o=5&dpr=1.1&pid=1.7"  style={{height : '38px'}}/> */}
                </Badge>
              </Button>
            <Button onClick={showLogoutModal} className="logout-main-buttons">
              <LogoutOutlined />
              Logout
            </Button>
          </div>
        </div>
        <TabComponent />
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <div className = 'notify-menu'>
      <p style={{ textAlign: 'center', fontSize: '20px',margin : '0px', padding : '0px',fontWeight : '600'}}>Notifications</p>
      <CloseOutlined onClick={() => closeSidebar()} className = 'close-btn' style={{ marginBottom: '4px', marginTop: '8px' }}/>
      
      </div>   
        {notificationMenu}
      </div>
       

      <Modal
        title="Confirm Logout"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Logout"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};

export default MainPage;
