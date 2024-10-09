import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateExperienceCategoryDto {

    @ApiProperty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsString()
    icon: string;

}
