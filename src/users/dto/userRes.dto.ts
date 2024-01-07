import { Exclude, Expose } from "class-transformer";


export class UserResDto {

    @Expose()
    firstName : string ; 
    @Expose()
    lastName : string ; 
    @Expose()
    email : string ; 
    @Expose()
    token : string ; 
    
}
