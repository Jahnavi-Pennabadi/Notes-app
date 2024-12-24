import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NotificationService from "../../services/notification.services";

export const getNotifications = createAsyncThunk(
    "notifications/getAll",
    async (userid:any, { rejectWithValue }) => {
        console.log(userid)
        try {
            const response = await NotificationService.getNotifications(userid);
            console.log('notifyresponse',response)
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const postNotification = createAsyncThunk(
    "notifications/create",
    async (data:any, { rejectWithValue }) => {
        try {
            const response = await NotificationService.postNotifications(data);
            console.log('slice-data',data)
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const editNotification = createAsyncThunk(
    "notifications/edit",
    async ({ id, data }:{id:any,data:any}, { rejectWithValue }) => {
        try {
            const response = await NotificationService.editNotifications(id, data);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const partialUpdateNotification = createAsyncThunk(
    "notifications/partialUpdate",
    async ({ id, data }:{id:string,data:any}, { rejectWithValue }) => {
        try {
            const response = await NotificationService.partialNotificationUpdate(id, data);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteNotification = createAsyncThunk(
    "notifications/delete",
    async (id:string, { rejectWithValue }) => {
        try {
            const response = await NotificationService.deleteNotifications(id);
            return response
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
const initialState = {
    notificationsList: [],
    notificationToParticularUser: [],
    loading: false,
    error: null,
    displayNotifications : []
};


const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        displayNoticationsOnIcon :(state:any,action) => {
            state.displayNotifications = [...state.displayNotifications ,action.payload]
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notificationToParticularUser = action.payload;
            })
            .addCase(getNotifications.rejected, (state:any, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(postNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postNotification.fulfilled, (state:any, action) => {
                state.loading = false;
                state.notificationsList.push(action.payload);
            })
            .addCase(postNotification.rejected, (state:any, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editNotification.fulfilled, (state:any, action) => {
                state.loading = false;
                const updatedNotification = action.payload;
                state.notificationsList = state.notificationsList.map((notif:any) =>
                    notif.id === updatedNotification.id ? updatedNotification : notif
                );
            })
            .addCase(editNotification.rejected, (state:any, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(partialUpdateNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(partialUpdateNotification.fulfilled, (state:any, action) => {
                state.loading = false;
                const updatedNotification = action.payload;
                state.notificationsList = state.notificationsList.map((notif:any) =>
                    notif.id === updatedNotification.id ? updatedNotification : notif
                );
            })
            .addCase(partialUpdateNotification.rejected, (state:any, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNotification.fulfilled, (state:any, action) => {
                state.loading = false;
                state.notificationsList = state.notificationsList.filter(
                    (notif:any) => notif.id !== action.payload.id
                );
            })
            .addCase(deleteNotification.rejected, (state:any, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {displayNoticationsOnIcon} = notificationsSlice.actions

export default notificationsSlice.reducer;