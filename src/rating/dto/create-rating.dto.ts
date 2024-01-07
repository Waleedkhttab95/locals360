import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateRatingDto {
    @ApiProperty()
    @IsString()
    experienceId : string ; 

    @ApiProperty()
    @IsString()
    body : string ; 

    @ApiProperty()
    @IsNumber()
    stars: number
}
