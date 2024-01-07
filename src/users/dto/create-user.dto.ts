import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";


export class CreateUserDto {
    @ApiProperty()
    @IsString()
    firstName : string ; 
    @ApiProperty()
    @IsString()
    lastName: string ;
    @ApiProperty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsString()
    password : string;
    @ApiProperty()
    @IsString()
    phoneNumber: string;
    @ApiProperty()
    @IsString()
    gender: string;
    @ApiProperty()
    @IsString()
    birthdate: string;
}
