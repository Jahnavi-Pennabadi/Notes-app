import axiosInstance from "./api";

export class NotificationServices{
    async getNotifications(userid:any){
        console.log(userid)
        try {
            let notifications = await axiosInstance.get(`/shareditems/${userid}`)
            return notifications.data
            
        } catch (error) {
            throw error  
        } 
        
    }

    async postNotifications(data:any){
        try {
            let notifications = await axiosInstance.post('/shareditems',data)
            return notifications.data
        } catch (error) {
            throw error
        }
    }

    async editNotifications(id:string,data:any){
        try {
            let notifications = await axiosInstance.put(`/shareditems/${id}`,data)
            return notifications.data
        } catch (error) {
            throw error
        }
    }

    async partialNotificationUpdate(id:string,data:any){
        try {
            let response = await axiosInstance.patch(`/shareditems/${id}`,data)
            return response.data
        } catch (error) {
            throw error
        }
    }

    async deleteNotifications(id:string){
        try {
            let notifications = await axiosInstance.delete(`/shareditems/${id}`)
            return notifications.data
        } catch (error) {
            throw error
        }
    }
}

let NotificationService = new NotificationServices()
export default NotificationService