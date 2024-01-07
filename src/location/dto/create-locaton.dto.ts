import { IsString } from "class-validator";
import { City } from "../../city/entities/city.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {
    @ApiProperty()
    @IsString()
    description : string ; 

    @ApiProperty()
    @IsString()
    long : string ; 

    @ApiProperty()
    @IsString()
    lat : string ; 
    
    @ApiProperty()
    @IsString()
    city : City ; 
}
