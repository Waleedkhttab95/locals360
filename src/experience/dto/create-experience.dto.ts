import { Type } from "class-transformer";
import { IsArray, IsObject, IsString,ArrayMinSize, isObject, ValidateNested, IsNumber } from "class-validator";
import { Slots } from "../entities/slots.entity";
import { City } from "../../city/entities/city.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateExperienceDto {

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    images: string[];

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    videos: string[];

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    guide: string; 

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    items: string[]; 

    @ApiProperty()
    @IsString()
    locationDescription: string; 

    @ApiProperty()
    @IsString()
    long: string; 
    
    @ApiProperty()
    @IsString()
    lat: string; 

    @ApiProperty()
    @IsArray()
    //@ValidateNested({ each: true })
    @ArrayMinSize(1)
    slots: any[]; // 

    @ApiProperty()
    @IsString()
    policy: string;

    @ApiProperty()
    @IsString()
    requirements: string;

    @ApiProperty()
    @IsString()
    city: City;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNumber()
    priceWithoutTax: number;
    

}
