import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FolderService } from "../../services/folder.services";

export const addFolder = createAsyncThunk(
  "folders/addFolder",
  async (data: any, { rejectWithValue }) => {
    try {
      const folderService = new FolderService();
      const response = await folderService.addFolder(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getFolders = createAsyncThunk(
  "folders/getFolders",
  async (createdBy:any, { rejectWithValue }) => {
    try {
      const folderService = new FolderService();
      const response = await folderService.getFolders(createdBy);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const editFolder = createAsyncThunk(
  "folders/editFolder",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const folderService = new FolderService();
      await folderService.editFolder(id, data);
      const updatedFolders = await folderService.getFolders(data.createdBy);
      return updatedFolders;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteFolder = createAsyncThunk(
  "folders/deleteFolder",
  async (id: string, { rejectWithValue }) => {
    try {
      const folderService = new FolderService();
      await folderService.deleteFolder(id);
      return { id };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updatePartialFolder = createAsyncThunk(
  "folders/updatePartialFolder",
  async ({ id, data }: { id: string; data: Partial<any> }, { rejectWithValue }) => {
    try {
      const folderService = new FolderService();
      const response = await folderService.updatePartialFolder(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const folderSlice = createSlice({
  name: "folders",
  initialState: {
    foldersList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFolder.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.foldersList.push(action.payload);
      })
      .addCase(addFolder.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFolders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFolders.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.foldersList = action.payload;
      })
      .addCase(getFolders.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editFolder.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.foldersList = action.payload;
      })
      .addCase(editFolder.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePartialFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePartialFolder.fulfilled, (state: any, action: any) => {
        state.loading = false;
        const updatedFolder = action.payload;
        state.foldersList = state.foldersList.map((folder: any) =>
          folder.id === updatedFolder.id ? updatedFolder : folder
        );
      })
      .addCase(updatePartialFolder.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFolder.fulfilled, (state: any, action: any) => {
        state.foldersList = state.foldersList.filter((folder: any) => folder.id !== action.payload.id);
      });
  },
});

export default folderSlice.reducer;
