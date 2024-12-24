import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home/home.component';
import MainPage from './pages/mainpage/mainpage.component';
import RunWay from './pages/runway/runway';
import NotFound from './components/notfound/notfound.component';
import LoginPage from './pages/login/loginpage';
import socket from './pages/socket/socket';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from './features/user/user.slice';
import { countNotifications, getNoteList } from './features/note/note.slice';
import { displaySharableNote } from './features/note/note.slice';
import { debug } from 'console';
import { displayNoticationsOnIcon } from './features/notifications/notifications.slice';

function App() {
  const showNotification = (name: string, note: string, permission: string,sharedByName:any) => {
    toast.info(
      <div>
        <p>a new note {note} has arrived From {sharedByName}</p>        
      </div>,
      {
        autoClose: 3000,
        position: 'top-right',
        hideProgressBar: true,
        closeButton: false,
      }
    );
  };
  const Users = useSelector((state: any) => state.userSlice.UsersList);
  let dispatch:any = useDispatch()

  useEffect(() => {
    const handleNotification = (receiveddata:any) => {
      const loggedInUserEmail = sessionStorage.getItem('UserID');
      if (!loggedInUserEmail) {
        console.error('UserID is not found in sessionStorage');
        return;
      }
  
      console.log('notificationsdata', receiveddata);
      let data = receiveddata.sharedItem;
      let notesData = receiveddata.singleNote;
  
      if (data && loggedInUserEmail === data.sharedToId) {
        const { sharedToName, ItemId, permission, sharedByName } = data;
        showNotification(sharedToName, notesData?.title, permission, sharedByName);
        dispatch(displaySharableNote(notesData));
        dispatch(countNotifications(1))
        dispatch(displayNoticationsOnIcon(data))
      }
    };
  
    socket.on('notification', handleNotification);
  
    return () => {
      socket.off('notification', handleNotification);
    };
  }, []);
  
  
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/runway" element={<RunWay />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
