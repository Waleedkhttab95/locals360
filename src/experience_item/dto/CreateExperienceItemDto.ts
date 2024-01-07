import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateExperienceItemDto {

    @ApiProperty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsString()
    icon: string;

}
