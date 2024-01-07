import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    firstName : string ; 
    @IsString()
    lastName: string ;
    @IsString()
    phoneNumber: string;
    @IsString()
    gender: string;
    @IsString()
    birthdate: string;
}
