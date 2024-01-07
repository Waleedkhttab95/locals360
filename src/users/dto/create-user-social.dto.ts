import { IsEmail, IsString } from "class-validator";


export class CreateSocialUserDto {
    @IsString()
    firstName : string ; 
    @IsString()
    lastName: string ;
    @IsEmail()
    email: string;

}
