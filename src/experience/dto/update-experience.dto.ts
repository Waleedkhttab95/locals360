import { Type } from "class-transformer";
import { IsArray, IsObject, IsString,ArrayMinSize, isObject, ValidateNested } from "class-validator";
import { Slots } from "../entities/slots.entity";
import { PartialType } from "@nestjs/mapped-types";
import { CreateExperienceDto } from "./create-experience.dto";

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {
    @IsString()
    images: string[];

    @IsString()
    videos: string[];

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    items: string[]; 

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => Slots)
    slots: Slots[]; // 


    @IsString()
    policy: string;

    @IsString()
    requirements: string;
}
