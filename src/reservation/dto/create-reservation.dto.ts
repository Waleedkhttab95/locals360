import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import mongoose from "mongoose";
import { Experience } from "src/experience/entities/experience.entity";
import { Guide } from "src/guide/entities/guide.entity";
import { User } from "src/users/entities/user.entity";

export class CreateReservationDto {

    @ApiProperty()
    @IsString()
    dateOfExperience: string;
    @ApiProperty()
    @IsNumber()
    price: number;
    @ApiProperty()
    @IsString()
    location: string;
    @ApiProperty()
    @IsNumber()
    qty: number;
    @ApiProperty()
    @IsString()
    transaction: string;
    @ApiProperty()
    @IsString()
    experience: string; //ref
}
