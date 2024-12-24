import axios from "axios";
import axiosInstance from "./api";

export class FolderService {
  
  async addFolder(data: any) {
    try {
      const response = await axiosInstance.post('/folders', data);
      console.log('Folder added successfully:', response.data);
      return response.data;  
    } catch (e: any) {
      console.error('Error adding folder:', e.response?.data || e.message);
      throw e.response?.data || e.message; 
    }
  }

  async getFolders(createdBy:any) {
    try {
      const response = await axiosInstance.get(`/folders/${createdBy}`);
      console.log('Fetched folders:', response.data);
      return response.data; 
    } catch (e: any) {
      console.error('Error fetching folders:', e.response?.data || e.message);
      throw e.response?.data || e.message; 
    }
  }

  async editFolder(id: string, data: any) {
    try {
      const response = await axiosInstance.put(`/folders/update/${id}`, data);
      console.log("Folder updated successfully:", response.data);
      return response.data;
    } catch (e: any) {
      console.error("Error updating folder:", e.response?.data || e.message);
      throw e.response?.data || e.message;
    }
  }

  async deleteFolder(id: string) {
    try {
      const response = await axiosInstance.delete(`/folders/delete/${id}`);
      console.log("Folder deleted successfully:", response.data);
      return response.data; 
    } catch (e: any) {
      console.error('Error deleting folder:', e.response?.data || e.message);
      throw e.response?.data || e.message; 
    }
  }

  async updatePartialFolder(id: string, data: any) {
    try {
      const response = await axiosInstance.patch(`/folders/${id}`, data);
      console.log("Folder partially updated successfully:", response.data);
      return response.data;
    } catch (e: any) {
      console.error("Error updating folder:", e.response?.data || e.message);
      throw e.response?.data || e.message;
    }
  }
}
