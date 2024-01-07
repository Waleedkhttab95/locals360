import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCityDto {
    @ApiProperty()
    @IsString()
    city : string ; 
    @ApiProperty()
    @IsString()
    country : string ; 

}
