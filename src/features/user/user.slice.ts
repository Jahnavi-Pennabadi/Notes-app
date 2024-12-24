import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserServices } from "../../services/user.services";
let UserService = new UserServices()

export const getAllUsers = createAsyncThunk("users/getAll", async (_, { rejectWithValue }) => {
    try {
        const response = await UserService.getUsers();
        console.log('userlist',response)
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getUser = createAsyncThunk("users/getOne", async (id: string, { rejectWithValue }) => {
    try {
        const response = await UserService.getUser(id);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const postUser = createAsyncThunk("users/create", async (data, { rejectWithValue }) => {
    try {
        const response = await UserService.postUsers(data);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const editUser = createAsyncThunk(
    "users/edit",
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await UserService.editUsers(id, data);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const partialUpdateUser = createAsyncThunk(
    "users/partialUpdate",
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await UserService.partialUserUpdate(id, data);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteUser = createAsyncThunk("users/delete", async (id: string, { rejectWithValue }) => {
    try {
        const response = await UserService.deleteUsers(id);
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const initialState = {
    UsersList: [],
    Loading: false,
    error: null,
    user: {},
};

const UserSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.Loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.Loading = false;
                state.UsersList = action.payload;
            })
            .addCase(getAllUsers.rejected, (state:any, action) => {
                state.Loading = false;
                state.error = action.payload;
            })
            .addCase(getUser.pending, (state) => {
                state.Loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.Loading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state:any, action) => {
                state.Loading = false;
                state.error = action.payload;
            })
            .addCase(postUser.pending, (state) => {
                state.Loading = true;
                state.error = null;
            })
            .addCase(postUser.fulfilled, (state:any, action) => {
                state.Loading = false;
                state.UsersList.push(action.payload);
            })
            .addCase(postUser.rejected, (state:any, action) => {
                state.Loading = false;
                state.error = action.payload;
            })
            .addCase(editUser.pending, (state) => {
                state.Loading = true;
                state.error = null;
            })
            .addCase(editUser.fulfilled, (state:any, action) => {
                state.Loading = false;
                const updatedUser = action.payload;
                state.UsersList = state.UsersList.map((user:any) =>
                    user.id === updatedUser.id ? updatedUser : user
                );
            })
            .addCase(editUser.rejected, (state:any, action) => {
                state.Loading = false;
                state.error = action.payload;
            })
            .addCase(partialUpdateUser.pending, (state) => {
                state.Loading = true;
                state.error = null;
            })
            .addCase(partialUpdateUser.fulfilled, (state:any, action) => {
                state.Loading = false;
                const updatedUser = action.payload;
                state.UsersList = state.UsersList.map((user:any) =>
                    user.id === updatedUser.id ? updatedUser : user
                );
            })
            .addCase(partialUpdateUser.rejected, (state:any, action) => {
                state.Loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.Loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.Loading = false;
                state.UsersList = state.UsersList.filter((user:any) => user.id !== action.payload.id);
            })
            .addCase(deleteUser.rejected, (state:any, action) => {
                state.Loading = false;
                state.error = action.payload;
            });
    },
});

export default UserSlice.reducer;
