export abstract class AbstractUser{
   abstract getAllUsers():any;
   abstract getUserById(id:string):any;
   abstract createUsers(data:any):any;
   abstract updateUsers(id:string,data:any):any;
   abstract deleteUsers(id:string):any;
   abstract updateUserFields(id:string,data:any):any;
}