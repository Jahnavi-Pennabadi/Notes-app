import axios from "axios";
import axiosInstance from "./api";

export class UserServices{
    async getUsers(){
        try {
            let users = await axiosInstance.get('/users')

            return users.data
        } catch (e) {
            throw e
        }
    }

    async getUser(id:string){
        try {
            let user = await axiosInstance.get(`/users/${id}`)
            return user.data
        } catch (error) {
            throw error
        }

    }

    async postUsers(data:any){
        try {
            let users = await axiosInstance.post('/users',data)
            return users.data
        } catch (error) {
           throw error 
        }
    }

    async editUsers(id:string,data:any){
        try {
            let users = await axiosInstance.put(`/users/${id}`,data)
            return users.data
        } catch (error) {
            throw error
        }
    }

    async partialUserUpdate(id:string,data:any){
        try {
            let users = await axiosInstance.patch(`/users/${id}`,data)
            return users.data
        } catch (error) {
            throw error
        }
    }

    async deleteUsers(id:string){
        try {
            let users = await axiosInstance.delete(`/users/${id}`)
            return users.data
        } catch (error) {
            throw error
        }
    }

}
