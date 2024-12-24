import { InjectModel } from "@nestjs/sequelize";
import { AbstractTypesDao } from "../abstract/types.abstract";
import { Types } from "../model/types.model";


export class TypesDao implements AbstractTypesDao{
    constructor(
        @InjectModel(Types)
        private readonly TypesModel : typeof Types
    ){}

    findAllTypes = async() => {
        try {
        let Users = await this.TypesModel.findAll()
        console.log(Users)
        return Users   
        } catch (error) {
            throw new Error(error)
        }
    }

    postType = async(data:any) => {
        try {
            let response = await this.TypesModel.create(data)
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    editType = async(typeId : any,Data :any) => {
        try {
            let UserExists = await this.TypesModel.findByPk(typeId)
            if(!UserExists){
                return 'User Not Found'
            }
            let response = await this.TypesModel.update(Data,{
                where : {id : typeId}
            })
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    partialTypeUpdate = async(typeId : string,partialData : any) => {
        try {
            let TypeExists = await this.TypesModel.findByPk(typeId)
            if(!TypeExists){
                return 'User Not Found'
            }
            let response = await this.TypesModel.update(partialData,{
                where : {id : typeId}
            })
            return await this.TypesModel.findByPk(typeId)
        } catch (error) {
            throw new Error(error)
        }
    }

    deleteType = async(userId:string) => {
        try {
            let response = await this.TypesModel.destroy({where : {id:userId}})
            return response
            
        } catch (error) {
            throw new Error(error)
        }
    }
}