import { PartialType } from '@nestjs/mapped-types';
import { CreateGuideDto } from './create-guide.dto';
import { IsString } from 'class-validator';

export class UpdateGuideDto extends PartialType(CreateGuideDto) {
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
