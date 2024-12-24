

export abstract class AbstractTypesDao{
    abstract findAllTypes():any;
    abstract postType(Data:any):any;
    abstract editType(userId:string,Data : any):any;
    abstract partialTypeUpdate(userId:string,partialData : any):any;
    abstract deleteType(userId :string):any;
}