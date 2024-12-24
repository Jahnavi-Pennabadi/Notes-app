import {configureStore} from '@reduxjs/toolkit'
import NoteReducer from './note/note.slice'
import FolderReducer from './folder/folder.slice'
import UserReducer from './user/user.slice'
import NotificationReducer from './notifications/notifications.slice'

let store = configureStore({
    reducer : {
        noteSlice : NoteReducer,
        folderSlice : FolderReducer,
        userSlice : UserReducer,
        notificationSlice : NotificationReducer

    }
})


export default store