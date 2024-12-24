import axiosInstance from "./api";

export class NoteService {
  async addNotes(data: any) {
    try {     
      const response = await axiosInstance.post('/notes', data);
      console.log('Note added successfully:', response.data);
      return response.data;  
    } catch (e: any) {
      console.error('Error adding note:', e.response?.data || e.message);
      throw e.response?.data || e.message; 
    }
  }

  async getNotes(id:any) {    
    try {
      const response = await axiosInstance.get(`/notes`);
      console.log(response)
      console.log('Fetched notes:', response.data);
      return response.data; 
    } catch (e: any) {
      console.error('Error fetching notes:', e.response?.data || e.message);
      throw e.response?.data || e.message; 
    }
  }

  async getSharedNotes(){
    try {
      const response = await axiosInstance.get(`/notes`);
      console.log(response)
      console.log('Fetched notes:', response);
      return response.data; 
    } catch (e: any) {
      console.error('Error fetching notes:', e.response?.data || e.message);
      throw e.response?.data || e.message; 
    }
  }

  async getAllNotesList() {    
    try {
      const response = await axiosInstance.get(`/notes`);
      console.log(response)
      console.log('Fetched notes:', response);
      return response.data; 
    } catch (e: any) {
      console.error('Error fetching notes:', e.response?.data || e.message);
      throw e.response?.data || e.message; 
    }
  }

  async editNotes(id: string, data: any) {
    try {
      const response = await axiosInstance.put(`/notes/${id}`);
      console.log("Note updated successfully:", response.data);
      return response.data;
    } catch (e: any) {
      console.error("Error updating note:", e.response?.data || e.message);
      throw e.response?.data || e.message;
    }
  }


  async deleteNotes(id:string) {
    try {
      const response = await axiosInstance.delete(`/notes/${id}`);
      console.log(id)
      return response.data; 
    } catch (e: any) {
      console.error('Error Deleting notes:', e.response?.data || e.message);
      throw e.response?.data || e.message; 
    }
  }

  async updatePartialNotes(id:string,data:any){
    try {
      const response = await axiosInstance.patch(`/notes/${id}`, data);
      console.log("Note updated successfully:", response.data);
      return response.data;
    } catch (e: any) {
      console.error("Error updating note:", e.response?.data || e.message);
      throw e.response?.data || e.message;
    }

  }

}
