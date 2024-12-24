import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NoteService } from "../../services/note.services";
import { notification } from "antd";

export const addNote = createAsyncThunk(
  'notes/addNote',
  async (data: any, { rejectWithValue }) => {
    console.log('addnotedata',data)
    try {
      const noteService = new NoteService();
      const response = await noteService.addNotes(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);



export const getNote = createAsyncThunk(
  'notes/getNote',
  async (createdBy:any, { rejectWithValue }) => {
    try {
      const noteService = new NoteService();
      const response = await noteService.getNotes(createdBy);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getNoteList = createAsyncThunk(
  'notes/getNoteList',
  async (_, { rejectWithValue }) => {
    try {
      const noteService = new NoteService();
      const response = await noteService.getAllNotesList();
      console.log('es',response)
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// export const getSharedNoteList = createAsyncThunk(
//   'notes/getSharedNoteList',
//   async (_, { rejectWithValue }) => {
//     try {
//       const noteService = new NoteService();
//       const response = await noteService.getSharedNotes();
//       console.log('es',response)
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error);
//     }
//   }
// );


export const editNote = createAsyncThunk(
  'notes/editNote',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const noteService = new NoteService();
      const response = await noteService.editNotes(id, data);
      console.log('edit',response)
      const res = await noteService.getNotes(data.createdBy)
      return res;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id: string, { rejectWithValue }) => {
    try {
      const noteService = new NoteService();
      await noteService.deleteNotes(id);
      return { id };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updatePartialNote = createAsyncThunk(
  'notes/patchNote',
  async ({ id, data }: { id: string; data: Partial<any> }, { rejectWithValue }) => {
    try {
      const noteService = new NoteService();
      const response = await noteService.updatePartialNotes(id, data); 
      return response;
    } catch (error: any) {
      return rejectWithValue(error); 
    }
  }
);


const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    notesList: [],
    allNotes : [],
    sharedNotes : [],
    loading: false,
    error: null,
    searchVal : '',
    notificationData : '',
    displaySharedNote : [],
    notificationCount : 0
  },
  reducers: {
    search : (state,action) => {
        state.searchVal = action.payload
    },
    notifyNotes : (state,action) => {
        state.notificationData = action.payload
    },
    displaySharableNote :(state:any,action) => {
        state.displaySharedNote = [...state.displaySharedNote ,action.payload]
    },
    countNotifications : (state:any,action) => {
        state.notificationCount += action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNote.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.notesList.push(action.payload);
      })
      .addCase(addNote.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNote.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.notesList = action.payload;
      })
      .addCase(getNote.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getNoteList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNoteList.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.allNotes = action.payload;
      })
      .addCase(getNoteList.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
   
      .addCase(editNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editNote.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.notesList = action.payload
      })
      .addCase(editNote.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePartialNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePartialNote.fulfilled, (state: any, action: any) => {
        state.loading = false;
        const updatedNote = action.payload;
        state.notesList = state.notesList.map((note: any) =>
          note.id === updatedNote.id ? updatedNote : note
        );
      })
      .addCase(updatePartialNote.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteNote.fulfilled, (state: any, action: any) => {
        state.notesList = state.notesList.filter((note: any) => note.id !== action.payload.id);
      });
  },
});

export const {search,notifyNotes,displaySharableNote,countNotifications} = noteSlice.actions
export default noteSlice.reducer;
