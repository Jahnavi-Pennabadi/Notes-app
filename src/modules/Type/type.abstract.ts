export abstract class AbstractType{
    abstract getAllTypes():any;
    abstract createTypes(data:any):any;
    abstract updateTypes(id:string,data:any):any;
    abstract deleteTypes(id:string):any;
    abstract updateTypeFields(id:string,data:any):any;
 }