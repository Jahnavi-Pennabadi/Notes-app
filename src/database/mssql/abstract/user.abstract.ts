
export abstract class AbstractUsersDao{
    abstract findAllUsers():any;
    abstract findUser(userId:string):any;
    abstract postUser(Data:any):any;
    abstract editUser(userId:string,Data : any):any;
    abstract partialUserUpdate(userId:string,partialData : any):any;
    abstract deleteUser(userId :string):any;
}