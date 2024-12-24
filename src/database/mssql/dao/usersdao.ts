import { InjectModel } from "@nestjs/sequelize";
import { AbstractUsersDao } from "../abstract/user.abstract";
import { Users } from "../model/users.model";


export class UsersDao implements AbstractUsersDao{
    constructor(
        @InjectModel(Users)
        private readonly UsersModel : typeof Users
    ){}

    findAllUsers = async() => {
        try {
        let Users = await this.UsersModel.findAll()
        console.log(Users)
        return Users   
        } catch (error) {
            throw new Error(error)
        }
    }

    findUser = async(userId:string) => {
        try {
            let User = await this.UsersModel.findByPk(userId)
            if(!User){
                return 'No User Exists'
            }
            return User
        } catch (error) {
            throw new Error(error)
        }
    }

    postUser = async(data:any) => {
        try {
            let response = await this.UsersModel.create(data)
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    editUser = async(userId : string,Data :any) => {
        try {
            let UserExists = await this.UsersModel.findByPk(userId)
            if(!UserExists){
                return 'User Not Found'
            }
            let response = await this.UsersModel.update(Data,{
                where : {id : userId}
            })
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    partialUserUpdate = async(userId : string,partialData : any) => {
        try {
            let UserExists = await this.UsersModel.findByPk(userId)
            if(!UserExists){
                return 'User Not Found'
            }
            let response = await this.UsersModel.update(partialData,{
                where : {id : userId}
            })
            return await this.UsersModel.findByPk(userId)
        } catch (error) {
            throw new Error(error)
        }
    }

    deleteUser = async(userId:string) => {
        try {
            let response = await this.UsersModel.destroy({where : {id:userId}})
            return response
            
        } catch (error) {
            throw new Error(error)
        }
    }
}